// --- Smooth scroll ---
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// --- Fade-in on scroll ---
const fadeElements = document.querySelectorAll('.section, .gallery img, header');

const fadeInOnScroll = () => {
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// --- Header shrink on scroll ---
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        hero.classList.add('shrink');
    } else {
        hero.classList.remove('shrink');
    }
});
// --- Slide-in animation for extra lists ---
const slideElements = document.querySelectorAll('.slide-in');

const slideInOnScroll = () => {
    slideElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
};
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.slide-in').forEach(el => {
        el.classList.add('visible');
    });
});


window.addEventListener('scroll', slideInOnScroll);
window.addEventListener('load', slideInOnScroll);
// --- Slide-in animation ---
const slideElements2 = document.querySelectorAll('.slide-in');

const slideInOnScroll2 = () => {
    slideElements2.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', slideInOnScroll2);
window.addEventListener('load', slideInOnScroll2);


// --- Sticky top-nav that hides on scroll down and shows on scroll up ---
let lastScroll = window.scrollY;
const topNav = document.getElementById('top-nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Scroll w dół → chowamy pasek
    if (currentScroll > lastScroll) {
        topNav.classList.remove('nav-visible');
        topNav.classList.add('nav-hidden');
    } 
    // Scroll w górę → pokazujemy pasek
    else {
        topNav.classList.remove('nav-hidden');
        topNav.classList.add('nav-visible');
    }

    lastScroll = currentScroll;
});
// --- Smooth scroll for top-nav links ---
document.querySelectorAll('#top-nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});
// Fade + slide on scroll
const animatedSections = document.querySelectorAll('.section');

const animateOnScroll = () => {
    animatedSections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            sec.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
// --- ANIMACJA POJAWIANIA SIĘ ZDJĘĆ ---
const galleryImages = document.querySelectorAll('.gallery img');

const revealGalleryImages = () => {
    galleryImages.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            img.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealGalleryImages);
window.addEventListener('load', revealGalleryImages);

