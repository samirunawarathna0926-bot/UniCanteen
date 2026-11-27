
import { db, ensureAuth } from "./firebase.js";

import {
    collection,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
    doc,
    writeBatch
} from "firebase/firestore";

export const LIMIT = 40;
export const WINDOW_MS = 10 * 60 * 1000;

// Retained for compatibility with order-monitor.js
export const STORAGE_KEY = "unicanteenRollingDemandV1";

const CANTEENS = ["Kalderama", "Hilton"];

let sharedState = {
    Kalderama: { timestamps: [] },
    Hilton: { timestamps: [] }
};


// 1. SAVE CONFIRMED ORDERS TO FIRESTORE

export async function recordCanteenOrders(items, orderId) {

    const orderedCanteens = new Set(
        items.map(item => item.canteen)
            .filter(name => CANTEENS.includes(name))
    );

    if (orderedCanteens.size === 0) return;

    const user = await ensureAuth();
    const batch = writeBatch(db);

    for (const canteen of orderedCanteens) {

        const orderRef = doc(
            collection(db, "canteenOrders"),
            `${user.uid}-${orderId}-${canteen}`
        );

        batch.set(orderRef, {
            canteen: canteen,
            createdAt: serverTimestamp(),
            userId: user.uid,
            orderId: orderId
        });
    }

    await batch.commit();
}


// 2. CALCULATE DEMAND AND WARNING DURATION

export function evaluateDemand(data = {}, now = Date.now()) {

    const history = (data.timestamps || [])
        .filter(t => Number.isFinite(t) && t <= now)
        .sort((a, b) => a - b);

    const timestamps = history.filter(
        t => t > now - WINDOW_MS
    );

    let alertUntil = 0;
    let left = 0;

    for (let right = 0; right < history.length; right++) {

        const time = history[right];

        // Review existing warnings at their expiry time.
        while (alertUntil > 0 && alertUntil <= time) {

            const reviewTime = alertUntil;

            while (
                left < right &&
                history[left] <= reviewTime - WINDOW_MS
            ) {
                left++;
            }

            if (right - left >= LIMIT) {
                alertUntil += WINDOW_MS;
            } else {
                alertUntil = 0;
            }
        }

        // Remove orders outside the rolling window.
        while (
            left <= right &&
            history[left] <= time - WINDOW_MS
        ) {
            left++;
        }

        // Activate warning when threshold is reached.
        if (
            alertUntil === 0 &&
            right - left + 1 >= LIMIT
        ) {
            alertUntil = time + WINDOW_MS;
        }
    }

    // Review expired warnings up to the current time.
    while (alertUntil > 0 && alertUntil <= now) {

        const recentCount = history.filter(
            t => t > alertUntil - WINDOW_MS &&
                 t <= alertUntil
        ).length;

        if (recentCount >= LIMIT) {
            alertUntil += WINDOW_MS;
        } else {
            alertUntil = 0;
        }
    }

    return {
        timestamps,
        count: timestamps.length,
        alertUntil,
        highDemand: alertUntil > now
    };
}


// 3. PROVIDE CURRENT DEMAND INFORMATION

export function getDemandSnapshot(now = Date.now()) {

    const snapshot = {};

    for (const canteen of CANTEENS) {
        snapshot[canteen] = evaluateDemand(
            sharedState[canteen],
            now
        );
    }

    return snapshot;
}


// 4. RECEIVE SHARED FIRESTORE UPDATES

async function startSharedMonitoring() {

    await ensureAuth();

    const ordersQuery = query(
        collection(db, "canteenOrders"),
        orderBy("createdAt", "asc")
    );

    onSnapshot(ordersQuery, snapshot => {

        const next = {
            Kalderama: { timestamps: [] },
            Hilton: { timestamps: [] }
        };

        snapshot.forEach(orderDocument => {

            const data = orderDocument.data();

            if (next[data.canteen] && data.createdAt) {

                next[data.canteen].timestamps.push(
                    data.createdAt.toMillis()
                );

            }
        });

        sharedState = next;

        updateAllDemandNotices();

    }, error => {

        console.error(
            "Demand monitoring failed:",
            error
        );

    });
}


// 5. DISPLAY CANTEEN DEMAND WARNINGS

function updateAllDemandNotices() {

    const snapshot = getDemandSnapshot();

    for (const canteen of CANTEENS) {

        const notice = document.getElementById(
            "demand-" + canteen.toLowerCase()
        );

        if (!notice) continue;

        const data = snapshot[canteen];

        notice.hidden = !data.highDemand;

        if (!data.highDemand) {
            notice.replaceChildren();
            continue;
        }

        notice.innerHTML = `
            <div class="demand-notice-header">
                <strong>${canteen}</strong>
                <span class="demand-badge">
                    High Demand
                </span>
            </div>

            <p class="demand-count">
                ${data.count} orders in the last 10 minutes
            </p>

            <p>
                This canteen is currently experiencing
                high demand.
            </p>

            <p>
                To reduce waiting time, please consider
                ordering from another available canteen.
            </p>

            <p class="demand-note">
                You can still place your order
                at this canteen.
            </p>
        `;
    }
}


// 6. START REAL-TIME MONITORING

if (typeof document !== "undefined") {

    startSharedMonitoring().catch(error => {
        console.error("Firebase connection failed:", error);
    });

    setInterval(updateAllDemandNotices, 1000);
}
