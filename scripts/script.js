import { loadProjects } from './projects.js';

addEventListener("DOMContentLoaded", () => {
    console.log('HTML loaded');
    setMinPageHeight();

    loadProjects();

    window.addEventListener('resize', setMinPageHeight);

});

function setMinPageHeight() {
    // pages should at least fill the window vertically
    // except the last page, which should also account for the footer

    const navbar = document.querySelector('nav');
    const pages = document.querySelectorAll('.page');
    const navbarHeight = navbar.offsetHeight;
    const footerHeight = document.querySelector('footer').offsetHeight;
    if (pages.length > 0) {
        const lastPage = pages[pages.length - 1];

        pages.forEach(page => {
            if (lastPage === page) {
                page.style.backgroundColor = 'blue';
                page.style.minHeight = `${window.innerHeight - navbarHeight - footerHeight}px`;
            } else { 
                page.style.backgroundColor = 'red';
                page.style.minHeight = `${window.innerHeight - navbarHeight}px`;
            }
        });
    }

    // take the navbar height into account when scrolling to sections
    const html = document.querySelector('*');
    html.style.scrollPadding = `${navbarHeight}px 0 0 0`;
}

// highlight current section on navbar on scroll

// other interactions like hover effects on buttons, etc.