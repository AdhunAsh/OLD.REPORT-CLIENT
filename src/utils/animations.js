import { gsap } from 'gsap';

// Smooth scroll to top animation
export const smoothScrollToTop = () => {
    gsap.to(window, {
        duration: 1,
        scrollTo: { y: 0 },
        ease: "power2.out"
    });
};

// Stagger animation for product grids
export const animateProductGrid = (elements) => {
    gsap.fromTo(elements,
        { opacity: 0, y: 30, scale: 0.9 },
        { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        }
    );
};

// Button click animation
export const animateButtonClick = (element, callback) => {
    gsap.to(element, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: callback
    });
};

// Page transition animation
export const pageTransition = (element) => {
    return gsap.fromTo(element,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
};

// Hover animations
export const hoverScale = (element, scale = 1.05) => {
    gsap.to(element, {
        scale: scale,
        duration: 0.3,
        ease: "power2.out"
    });
};

export const hoverScaleReset = (element) => {
    gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
    });
};