import { loadProjects } from './projects.js';

let pages = document.querySelectorAll('.page');
let navLinks = document.querySelectorAll('.nav-link a');
let logo = document.querySelector('.logo');

addEventListener("DOMContentLoaded", () => {
    console.log('HTML loaded');
    setMinPageHeight();
    loadProjects();

    window.addEventListener('resize', setMinPageHeight);

    // the first child of the nav links should be selected by default
    navLinks[0].parentElement.classList.add('selected-nav');
    // flag to prevent selecting a nav link while scrolling from click
    let isMidScroll = false;

    // the css smooth scroll behavior is already done thru html and css
    // I just need to add the 'selected' class to the clicked link
    // and remove it from the current one (if it isnt the same)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            isMidScroll = true;
            handleNavSelect(e.target);
            setTimeout(() => { isMidScroll = false; }, 1000);
        })
    })

    // this is also done for the first link when clicking the logo
    logo.addEventListener('click', (e) => {
        isMidScroll = true;
        handleNavSelect(navLinks[0]);
        setTimeout(() => { isMidScroll = false; }, 1000);
    })

    // the corresponding nav link should be selected when scrolling to a page
    // event for scroll
    // window.scrollY gives you how much you have scrolled
    // how far is the top of the page from the top of the window (minus the navbar height)
    // change pages when the distance scrolled is more than the distance the page is offset from the top
    // added a 30% buffer to switch the nav link before the page is fully in view
    window.addEventListener('scroll', () => {
        // don't select a nav link on scroll if the user is scrolling from a nav link click
        if (isMidScroll) return;
        const navbarHeight = document.querySelector('.navbar').offsetHeight;

        pages.forEach(page => {
            let pageHeight = page.offsetHeight;
            let pageBuffer = Math.min(pageHeight, window.innerHeight - navbarHeight) * 0.3
            let pageOffset = page.offsetTop - navbarHeight - pageBuffer;
            let scrollY = window.scrollY;

            if (scrollY >= pageOffset && scrollY < (pageOffset + pageHeight)) {
                handleNavSelect(document.querySelector(`.nav-link a[href="#${page.id}"]`));
            }
        });
    });

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

function handleNavSelect(linkTo) {
    const prevSelectedLink = document.querySelector('.selected-nav a');
    if (prevSelectedLink !== linkTo) {
        prevSelectedLink.parentElement.classList.remove('selected-nav');
        linkTo.parentElement.classList.add('selected-nav');
    }
}

// rotating and color changing star svg on hover for the home button