import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const GlobalLoader = ({ isLoading }) => {
    const loaderRef = useRef(null);
    const logoRef = useRef(null);
    const progressRef = useRef(null);

    useEffect(() => {
        if (isLoading) {
            // Show loader
            gsap.set(loaderRef.current, { display: 'flex' });
            
            const tl = gsap.timeline({ repeat: -1 });
            
            // Animate logo
            tl.to(logoRef.current, {
                scale: 1.1,
                duration: 1,
                ease: "power2.inOut",
                yoyo: true,
                repeat: 1
            });
            
            // Animate progress bar
            gsap.to(progressRef.current, {
                width: '100%',
                duration: 2,
                ease: "power2.out"
            });
            
        } else {
            // Hide loader
            gsap.to(loaderRef.current, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    gsap.set(loaderRef.current, { display: 'none' });
                }
            });
        }
    }, [isLoading]);

    if (!isLoading) return null;

    return (
        <div 
            ref={loaderRef}
            className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center"
        >
            <div className="flex flex-col items-center space-y-8">
                <div 
                    ref={logoRef}
                    className="text-4xl font-bold text-black tracking-wider"
                >
                    DRESS CART
                </div>
                
                <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                        ref={progressRef}
                        className="h-full bg-black rounded-full w-0"
                    ></div>
                </div>
                
                <p className="text-gray-600 text-sm">Loading your experience...</p>
            </div>
        </div>
    );
};

export default GlobalLoader;