const menuBtn = document.getElementById('menu-btn');
const navLinks = document.querySelector('.nav-links');
const links = navLinks.querySelectorAll('a');

function setMenu(open){
    navLinks.classList.toggle('active', open);
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open);
}

menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    setMenu(!navLinks.classList.contains('active'));
});

links.forEach(link => link.addEventListener('click', () => setMenu(false)));

document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target)) setMenu(false);
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 1000) setMenu(false);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
});

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