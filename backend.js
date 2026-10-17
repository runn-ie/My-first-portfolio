const menuBtn = document.getElementById('menu-btn');
const navLinks = document.querySelector('.nav-links');
const links = navLinks.querySelectorAll('a');

/* ---------- Menu button ---------- */
function setMenu(open){
    navLinks.classList.toggle('active', open);
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open);
}

menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    setMenu(!navLinks.classList.contains('active'));
});

// close when a link is clicked
links.forEach(link => link.addEventListener('click', () => setMenu(false)));

// close when clicking outside the menu
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target)) setMenu(false);
});

// reset the menu if the window is made wide again
window.addEventListener('resize', () => {
    if (window.innerWidth > 1000) setMenu(false);
});

// close with Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
});

/* ---------- Highlight the link of the section being viewed ---------- */
const sections = document.querySelectorAll('section[id]');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting){
            links.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => observer.observe(section));