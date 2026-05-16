document.addEventListener('DOMContentLoaded', function() {
    const hours = [
        { day: 'Sunday', open: false },
        { day: 'Monday', start: '11:00 AM', end: '7:30 PM', open: true },
        { day: 'Tuesday', start: '11:00 AM', end: '7:30 PM', open: true },
        { day: 'Wednesday', start: '11:00 AM', end: '7:30 PM', open: true },
        { day: 'Thursday', start: '11:00 AM', end: '7:30 PM', open: true },
        { day: 'Friday', start: '11:00 AM', end: '7:30 PM', open: true },
        { day: 'Saturday', start: '11:00 AM', end: '7:30 PM', open: true }
    ];

    const now = new Date();
    const today = hours[now.getDay()];
    const el = document.getElementById('sj-hours');
    const noticeEl = document.getElementById('sj-orders-notice');

    if (!el) return;


    if (!today.open) {
        el.innerHTML = `
            <span class="sj-hours-closed">Closed Today</span>
            ${notice}
        `;
        return;
    }

    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    const openHour = 11;
    const closeHour = 19;
    const closeMin = 30;

    const isOpen = (currentHour > openHour ||
                   (currentHour === openHour && currentMin >= 0)) &&
                   (currentHour < closeHour ||
                   (currentHour === closeHour && currentMin < closeMin));

    el.innerHTML = `
        <span class="sj-hours-today">
            <span class="sj-today" style="font-weight: 900;">Today</span>
            ${today.start} – ${today.end}
        </span>
        <span class="sj-hours-status ${isOpen ? 'sj-open' : 'sj-closed'}">
            ${isOpen ? 'Open Now' : 'Closed'}
        </span>
    `;

        // Populate notice separately
    if (noticeEl) {
        noticeEl.textContent = 'Online Orders Only | No Phone Orders';
    }

});
