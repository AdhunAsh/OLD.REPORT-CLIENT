import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LoadingSpinner = () => {
    const containerRef = useRef(null);
    const dotsRef = useRef([]);

    useEffect(() => {
        const tl = gsap.timeline({ repeat: -1 });
        
        // Animate dots with stagger effect
        tl.to(dotsRef.current, {
            scale: 1.5,
            opacity: 0.8,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.inOut"
        })
        .to(dotsRef.current, {
            scale: 1,
            opacity: 0.3,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.inOut"
        }, "-=0.3");

        return () => tl.kill();
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="flex space-x-2 mb-4">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            ref={el => dotsRef.current[i] = el}
                            className="w-3 h-3 bg-black rounded-full opacity-30"
                        />
                    ))}
                </div>
                <p className="text-gray-600 text-sm font-medium">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;