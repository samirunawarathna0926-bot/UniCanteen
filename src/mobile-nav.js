const toggle = document.querySelector('.mobile-menu-toggle');
const nav = document.getElementById('main-navigation');
if (toggle && nav) {
    const setOpen = open => {
        nav.classList.toggle('active', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
        toggle.textContent = open ? '✕' : '☰';
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') { setOpen(false); } });
    matchMedia('(max-width: 900px)').addEventListener('change', () => setOpen(false));
}
