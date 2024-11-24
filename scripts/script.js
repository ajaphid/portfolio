import { loadProjects } from './projects.js';

let pages = document.querySelectorAll('.page');
let navLinks = document.querySelectorAll('.nav-link a');
let logo = document.querySelector('.logo');

let menuToggle = document.querySelector('.menu-toggle');
let navLinksContainer = document.querySelector('.nav-links');
let menuIcon = document.querySelector('.menu-icon');
let closeIcon = document.querySelector('.close-icon');
let clickableNavLinks = document.querySelectorAll('.nav-links li');


addEventListener("DOMContentLoaded", () => {
    console.log('HTML loaded');
    setMinPageHeight_NavBarHeight();
    loadProjects();

    // toggle menu visibility on click
    menuToggle.addEventListener('click', () => {
        console.log('menu clicked');
        /* this looks convoluted but it solved an issue I had with the transformX transition occuring on resize.
            so when the user would resize the page so the hamburger menu is visible, it would show a brief transform of the dropdown menu.
            this was solved by making these 'open' and 'closed' classes for the transform, that are only applied after the menu is toggled*/
        navLinksContainer.classList.toggle('open');
        if (navLinksContainer.classList.contains('open')) {
            navLinksContainer.classList.remove('closed');
        } else {
            navLinksContainer.classList.add('closed');
        }
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });

    // if the user is on mobile and one of the nav-links lis is clicked, close the menu 
    // (this includes the resume, which is a li but not a nav-link)
    clickableNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });


    // reset nav state on window resize (where the nav links are visible)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 585) {
            navLinksContainer.classList.remove('open', 'closed');
            navLinksContainer.style.transform = ''; // reset transform
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    });

    window.addEventListener('resize', setMinPageHeight_NavBarHeight);

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

function setMinPageHeight_NavBarHeight() {
    // pages should at least fill the window vertically
    // except the last page, which should also account for the footer
    // this should take into account the gap from the grid

    const navbar = document.querySelector('nav');
    const pages = document.querySelectorAll('.page');
    const navbarHeight = navbar.offsetHeight;
    const footerHeight = document.querySelector('footer').offsetHeight;

    // set the CSS variable for --navbar-height
    // to the min value of the navbarHeight or 73px

    document.documentElement.style.setProperty('--navbar-height', `${Math.max(navbarHeight, 73)}px`);
    
    // select the gap height from the css grid for the body
    const body = document.querySelector('body');
    const gapHeight = window.getComputedStyle(body).rowGap;
    // convert the string rem to a pixel value
    const gapHeightPx = parseFloat(gapHeight);


    if (pages.length > 0) {
        const lastPage = pages[pages.length - 1];

        // accounting for the footer
        pages.forEach(page => {
            if (lastPage === page) {
                page.style.minHeight = `${window.innerHeight - navbarHeight - footerHeight}px`;
            } else { 
                page.style.minHeight = `${window.innerHeight - navbarHeight}px`;
            }
        });
    }

    // take the navbar height into account when scrolling to sections
    const html = document.querySelector('*');
    html.style.scrollPadding = `${navbarHeight}px 0 0 0`;

    // const projectsPage = document.querySelector('#projects');
    // if (projectsPage) {
    //     const triangleHeight = 50;
    //     projectsPage.style.paddingTop = `${navbarHeight + triangleHeight}px`;
    // }

    /* Projects Page */
    // #projects {
    //     display: grid;
    //     position: relative;
    //     gap: 2rem;
    //     grid-template-rows: auto 1fr;
    //     background:
    //         linear-gradient(
    //             25deg,
    //             #9bdceb94,
    //             #e2e7c69b,
    //             #e4ebf195,
    //             #cddbf192,
    //             #f2e7f2,
    //             #e8f6a09b
    //         );

    //     margin: 2rem 0;
    //     padding-top: 6rem;
    //     padding-bottom: 8rem;
    //     /* box-shadow: 2px 2px 10px rgb(0, 0, 0); */
    // }

    // #projects::before,
    // #projects::after {
    //     content: ' ';
    //     position: absolute;
    //     width: 100%;
    //     height: 50px;
    //     background-color: var(--background-color);
    //     mask-image: url('../assets/border-shapes/triangle.svg');
    //     -webkit-mask-image: url('../assets/border-shapes/triangle.svg');
    //     /* margin: 6rem 0; */
    // }

    // #projects::before {
    //     top: 0rem;
    // }

    // #projects::after {
    //     bottom: 0;
    //     transform: rotate(.5turn);
    // }

    // for the projects page, take the triangle height into account on scroll navigation
    // i want to scroll to the top of the projects page, not the top of the triangle
    const projectsPage = document.querySelector('#projects');
    const triangleHeight = 50 * 2.75;
    if (projectsPage) {
        projectsPage.style.scrollMarginTop = `${navbarHeight - triangleHeight}px`; // Adjust for projects
    }


}

function handleNavSelect(linkTo) {
    const prevSelectedLink = document.querySelector('.selected-nav a');
    if (prevSelectedLink !== linkTo) {
        prevSelectedLink.parentElement.classList.remove('selected-nav');
        linkTo.parentElement.classList.add('selected-nav');
    }
}

function closeMenu() {
    if (window.innerWidth <= 585) {
    navLinksContainer.classList.remove('open');
    navLinksContainer.classList.add('closed');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
    }
}


// **TODO** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// **PROJECTS**
// figure out image column layout for mobile

// **INTERACTIONS**
// nav link-button should show a gradient on hover instead of --background-color
// logo star should have a spin animation on hover
// logo star should change to a gradient on hover
    // make the favicon the gradient star
// mobile tap animation for the logo star - a few spins and a gradient change



// **ASPIRATIONS**
// rotating and color changing star svg on hover for the home button
// add a dark mode toggle
// light or dark favicon based on the theme
// full accessibility guidelines for the site

