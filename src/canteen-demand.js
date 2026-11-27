// Rolling 10-minute demand monitor. Counts confirmed orders, not meals.
// Stored locally per browser; legacy cumulative counts cannot be migrated.
export const STORAGE_KEY = 'unicanteenRollingDemandV1';
export const LIMIT = 40;
export const WINDOW_MS = 10 * 60 * 1000;
const CANTEENS = ['Kalderama', 'Hilton'];

function readState() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {}; }
    catch { return {}; }
}

export function evaluateDemand(data = {}, now = Date.now()) {
    const timestamps = (Array.isArray(data.timestamps) ? data.timestamps : [])
        .filter(t => Number.isFinite(t) && t > now - WINDOW_MS && t <= now);
    const count = timestamps.length;
    let alertUntil = Number(data.alertUntil) || 0;
    if (alertUntil <= now) {
        // If demand remains high at expiry, renew for another 10 minutes.
        alertUntil = count >= LIMIT ? now + WINDOW_MS : 0;
    }
    return { timestamps, count, alertUntil, highDemand: alertUntil > now };
}

export function getDemandSnapshot(now = Date.now()) {
    const previous = readState();
    const next = {};
    const snapshot = {};
    for (const canteen of CANTEENS) {
        const data = evaluateDemand(previous[canteen], now);
        next[canteen] = { timestamps: data.timestamps, alertUntil: data.alertUntil };
        snapshot[canteen] = data;
    }
    if (JSON.stringify(previous) !== JSON.stringify(next)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
    return snapshot;
}

export function recordCanteenOrders(items) {
    const now = Date.now();
    const state = readState();
    const orderedCanteens = new Set(items.map(item => item.canteen).filter(name => CANTEENS.includes(name)));
    for (const canteen of orderedCanteens) {
        const data = evaluateDemand(state[canteen], now);
        data.timestamps.push(now);
        const updated = evaluateDemand(data, now);
        state[canteen] = { timestamps: updated.timestamps, alertUntil: updated.alertUntil };
    }
    if (orderedCanteens.size) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (typeof document !== 'undefined') updateAllDemandNotices();
}

function updateAllDemandNotices() {
    const notices = CANTEENS.map(canteen => [canteen, document.getElementById('demand-' + canteen.toLowerCase())]);
    if (!notices.some(([, notice]) => notice)) return;
    const snapshot = getDemandSnapshot();
    for (const [canteen, notice] of notices) {
        if (!notice) continue;
        const data = snapshot[canteen];
        notice.hidden = !data.highDemand;
        if (!data.highDemand) { notice.replaceChildren(); continue; }
        notice.innerHTML = `
            <div class="demand-notice-header"><strong>${canteen}</strong><span class="demand-badge">High Demand</span></div>
            <p class="demand-count">${data.count} orders in the last 10 minutes</p>
            <p>This canteen is currently experiencing high demand.</p>
            <p>To reduce waiting time, please consider ordering from another available canteen.</p>
            <p class="demand-note">You can still place your order at this canteen.</p>`;
    }
}

if (typeof document !== 'undefined' && typeof window !== 'undefined') {
    if (typeof document !== 'undefined') updateAllDemandNotices();
    if (document.getElementById('demand-kalderama') || document.getElementById('demand-hilton')) {
        setInterval(updateAllDemandNotices, 1000);
        window.addEventListener('storage', event => {
            if (event.key === STORAGE_KEY || event.key === null) updateAllDemandNotices();
        });
    }
}
