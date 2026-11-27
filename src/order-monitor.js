import { getDemandSnapshot, LIMIT, STORAGE_KEY } from './canteen-demand.js';

function updateDashboard() {
    const now = Date.now();
    const snapshot = getDemandSnapshot(now);
    for (const canteen of ['Kalderama', 'Hilton']) {
        const id = canteen.toLowerCase();
        const data = snapshot[canteen];
        document.getElementById(id + '-count').textContent = `${data.count} / ${LIMIT}`;
        document.getElementById(id + '-bar').style.width = `${Math.min(data.count / LIMIT * 100, 100)}%`;
        const status = document.getElementById(id + '-status');
        const timer = document.getElementById(id + '-timer');
        status.textContent = data.highDemand ? 'HIGH DEMAND' : 'Normal Demand';
        status.className = data.highDemand ? 'status high' : 'status';
        if (data.highDemand) {
            const seconds = Math.max(0, Math.ceil((data.alertUntil - now) / 1000));
            timer.textContent = `Alert review in ${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
        } else timer.textContent = '';
    }
}
updateDashboard();
setInterval(updateDashboard, 1000);
window.addEventListener('storage', event => {
    if (event.key === STORAGE_KEY || event.key === null) updateDashboard();
});
