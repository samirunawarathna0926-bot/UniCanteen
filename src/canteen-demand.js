// ==================================
// UNICANTEEN - HIGH DEMAND NOTIFICATION
// ==================================

const STORAGE_KEY = "unicanteenCanteenOrderCounts";
const HIGH_DEMAND_LIMIT = 40;
const HIGH_DEMAND_DURATION = 10 * 60 * 1000; // 10 minutes

function readCounts() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
        return {};
    }
}

// Count one confirmed order per eligible canteen
export function recordCanteenOrders(items) {
    const counts = readCounts();
    const eligibleCanteens = ["Kalderama", "Hilton"];

    const orderedCanteens = new Set(
        items.map(item => item.canteen).filter(name =>
            eligibleCanteens.includes(name)
        )
    );

    orderedCanteens.forEach(canteen => {
        const data = counts[canteen] || { count: 0, resetAt: null };

        // Reset expired high-demand period
        if (data.resetAt && Date.now() >= data.resetAt) {
            data.count = 0;
            data.resetAt = null;
        }

        data.count = (Number(data.count) || 0) + 1;

        // Start 10-minute period when threshold is reached
        if (data.count >= HIGH_DEMAND_LIMIT && !data.resetAt) {
            data.resetAt = Date.now() + HIGH_DEMAND_DURATION;
        }

        counts[canteen] = data;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
    updateAllDemandNotices();

    
}

function updateDemandNotice(canteen, elementId) {
    const notice = document.getElementById(elementId);
    if (!notice) return;

    const counts = readCounts();
    const data = counts[canteen] || { count: 0, resetAt: null };
    const count = Number(data.count) || 0;
    const resetAt = Number(data.resetAt) || 0;

    // Reset expired high-demand period
    if (resetAt && Date.now() >= resetAt) {
        counts[canteen] = { count: 0, resetAt: null };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
        notice.hidden = true;
        notice.replaceChildren();
        return;
    }

    if (count >= HIGH_DEMAND_LIMIT && resetAt > Date.now()) {
        notice.innerHTML = `
            <div class="demand-notice-header">
                <strong>${canteen}</strong>
                <span class="demand-badge">High Demand</span>
            </div>
            <p class="demand-count">${count} / ${HIGH_DEMAND_LIMIT} orders</p>
            <p>This canteen is currently experiencing high demand.</p>
            <p>To reduce waiting time, please consider ordering from another available canteen.</p>
            <p class="demand-note">You can still place your order at this canteen.</p>
        `;
        notice.hidden = false;
    } else {
        notice.hidden = true;
        notice.replaceChildren();
    }
}

function updateAllDemandNotices() {
    updateDemandNotice("Kalderama", "demand-kalderama");
    updateDemandNotice("Hilton", "demand-hilton");
}

updateAllDemandNotices();
setInterval(updateAllDemandNotices, 1000);

window.addEventListener("storage", event => {
    if (event.key === STORAGE_KEY) updateAllDemandNotices();
});