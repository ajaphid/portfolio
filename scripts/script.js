import { loadProjects } from './projects.js';

let pages = document.querySelectorAll('.page');
let navLinks = document.querySelectorAll('.nav-link a');

// the css smooth scroll behavior is already done thru html and css
// I just need to add the 'selected' class to the clicked link
// and remove it from the current one (if it isnt the same)
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const prevSelectedLink = document.querySelector('.selected-nav a');
        const selectedLink = e.target;
        console.log(prevSelectedLink);
        console.log(selectedLink);
        if (prevSelectedLink !== selectedLink) {
            prevSelectedLink.parentElement.classList.remove('selected-nav');
            selectedLink.parentElement.classList.add('selected-nav');
        }
    })
})

// the same nav link highlighting should be done when scrolling to a section
window.addEventListener('scroll', () => {
    pages.forEach(page => {
        let top = window.scrollY;
        let offset = page.offsetTop;
        let height = page.offsetHeight;
        let id = page.getAttribute('id');
    })
});


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

// bold on hover for navbar links without altering the layout
// highlight current section on navbar on "scroll to" or click selection

// other interactions like hover effects on buttons, etc.

// rotating and color changing star svg on hover for the home button