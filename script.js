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

// FAQ accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const button = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!button || !answer) return;

    const setExpanded = (expanded) => {
        item.classList.toggle('active', expanded);
        button.setAttribute('aria-expanded', String(expanded));
        answer.hidden = !expanded;
    };

    if (item.classList.contains('active')) {
        setExpanded(true);
    } else {
        setExpanded(false);
    }

    button.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        faqItems.forEach(otherItem => {
            const otherButton = otherItem.querySelector('.faq-question');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            if (!otherButton || !otherAnswer) return;
            otherItem.classList.remove('active');
            otherButton.setAttribute('aria-expanded', 'false');
            otherAnswer.hidden = true;
        });

        setExpanded(!isOpen);
    });
});

// Google review slider
const reviewSlides = document.querySelectorAll('.review-slide');
const reviewDots = document.querySelectorAll('.dot');
const prevButton = document.querySelector('.review-arrow.prev');
const nextButton = document.querySelector('.review-arrow.next');

let reviewIndex = 0;
let reviewTimer = null;

function showReview(nextIndex) {
    if (!reviewSlides.length) return;

    reviewIndex = (nextIndex + reviewSlides.length) % reviewSlides.length;

    reviewSlides.forEach((slide, index) => {
        slide.classList.toggle('active', index === reviewIndex);
    });

    reviewDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === reviewIndex);
    });
}

function startReviewAutoplay() {
    if (!reviewSlides.length) return;

    clearInterval(reviewTimer);
    reviewTimer = setInterval(() => {
        showReview(reviewIndex + 1);
    }, 5000);
}

if (reviewSlides.length) {
    showReview(0);
    startReviewAutoplay();

    prevButton?.addEventListener('click', () => {
        showReview(reviewIndex - 1);
        startReviewAutoplay();
    });

    nextButton?.addEventListener('click', () => {
        showReview(reviewIndex + 1);
        startReviewAutoplay();
    });

    reviewDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showReview(index);
            startReviewAutoplay();
        });
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
