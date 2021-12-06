import SmoothScrollbar from 'smooth-scrollbar';
import ScrollTriggerPlugin from 'vendor/smooth-scrollbar/ScrollTriggerPlugin';
import SoftScrollPlugin from 'vendor/smooth-scrollbar/SoftScrollPlugin';
import Particles from './particles';
import gsap from 'gsap';

// GSAP ScrollTrigger & Soft Edges plugin for SmoothScroll
SmoothScrollbar.use(ScrollTriggerPlugin, SoftScrollPlugin);

// Init smooth scrollbar
const view = document.getElementById('view-main');
const scrollbar = SmoothScrollbar.init(view, {
    renderByPixels: false,
    damping: 0.075
});

// Simple tabs logic
const tabs = document.querySelector('.cb-tabs');
const tabsNav = tabs.querySelectorAll('.cb-tabs-nav');
const tabsContent = tabs.querySelectorAll('.cb-tabs-content');

tabsNav.forEach((e, i) => {
    e.addEventListener('click', () => {
        tabsNav.forEach((e) => e.classList.remove('-active'));
        tabsContent.forEach((e) => e.classList.remove('-active'));
        tabsNav[i].classList.add('-active');
        tabsContent[i].classList.add('-active');

        tabs.classList.toggle('-inverse', i !== 1)
    });
});

// Get demo blocks
const demo = document.querySelectorAll('.cb-demo');

// Demo: 1
const demoParticles = demo[0].querySelector('.cb-particles');
const particles = new Particles({
    container: demoParticles,
    itemsSelector: ".cb-particles-item",
});

// Demo: 2
const demoParticles2 = demo[1].querySelector('.cb-particles');
const particles2 = new Particles({
    container: demoParticles2,
    itemsSelector: ".cb-particles-item",
    timeScale: -1,
    fadeInDuration: 0,
    fadeOutDuration: 0,
    duration: () => gsap.utils.random(3, 5)
});

// Demo: 3
const demoParticles3 = demo[2].querySelector('.cb-particles');
const particles3 = new Particles({
    container: demoParticles3,
    itemsSelector: ".cb-particles-item",
});

// Intro animation
const tl = gsap.timeline({paused: true});
const demoHeader = demo[0].querySelector('.cb-demo-header h1');

// Header
tl.fromTo(demoHeader, {
    opacity: 0,
    yPercent: 220,
    skewY: 5,
}, {
    opacity: 1,
    yPercent: 0,
    skewY: 0,
    duration: 3,
    ease: "expo.out",
}, 0);

// Animate particles timeScale
tl.fromTo(particles.getTimeline(), {
    timeScale: 10
}, {
    timeScale: 1,
    duration: 3
}, 0);

setTimeout(() => tl.play());