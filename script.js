// Optimized script.js — consolidated listeners and IntersectionObserver

// Smooth-scrolling for internal anchors
document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Modal for gallery images
const imgModal = document.getElementById('imgModal');
const imgModalContent = document.getElementById('imgModalContent');
function openImg(src) {
    if (!imgModal || !imgModalContent) return;
    imgModalContent.src = src;
    imgModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
function closeImg() {
    if (!imgModal) return;
    imgModal.style.display = 'none';
    imgModalContent.src = '';
    document.body.style.overflow = '';
}
if (imgModal) imgModal.addEventListener('click', closeImg);

// Header behavior: shrink + top-nav hide/show (throttled)
const hero = document.querySelector('.hero');
const topNav = document.getElementById('top-nav');
let lastScroll = window.scrollY || 0;
let ticking = false;
function onScroll() {
    const current = window.scrollY || 0;

    // shrink header
    if (hero) {
        hero.classList.toggle('shrink', current > 60);
    }

    // show/hide top nav
    if (topNav) {
        if (current > lastScroll && current > 100) {
            topNav.classList.remove('nav-visible');
            topNav.classList.add('nav-hidden');
        } else {
            topNav.classList.remove('nav-hidden');
            topNav.classList.add('nav-visible');
        }
    }

    // discount follow behavior: make .discount-floating fixed when user scrolls through cennik
    const discount = document.querySelector('.discount-floating');
    const cennik = document.querySelector('.cennik');
    if (discount && cennik) {
        const r = cennik.getBoundingClientRect();
        // when cennik is scrolled near top and still has space below, fix the discount to viewport
        if (r.top < 140 && r.bottom > 220) {
            discount.classList.add('discount-fixed');
        } else {
            discount.classList.remove('discount-fixed');
        }
    }

    lastScroll = current;
    ticking = false;
}
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
    }
});

// Use IntersectionObserver for reveal animations (sections, gallery images, slide-in)
const observerOptions = { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0 };
const revealCallback = (entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
};
const revealObserver = new IntersectionObserver(revealCallback, observerOptions);

document.querySelectorAll('.section, .gallery img, .slide-in').forEach(el => revealObserver.observe(el));

// Accessibility: respect reduced motion
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReduced) {
    document.querySelectorAll('.section, .gallery img, .slide-in').forEach(el => {
        el.classList.add('visible');
    });
}

// Expose openImg globally so onclick="openImg(this.src)" still works in HTML
window.openImg = openImg;
window.closeImg = closeImg;

// Ensure DOM-ready initializations
document.addEventListener('DOMContentLoaded', () => {
    // mark top-nav visible initially
    if (topNav && !topNav.classList.contains('nav-visible') && !topNav.classList.contains('nav-hidden')) {
        topNav.classList.add('nav-visible');
    }
});
