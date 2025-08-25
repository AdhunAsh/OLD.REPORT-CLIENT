import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const PageTransition = ({ children, trigger }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(containerRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
            );
        }
    }, [trigger]);

    return (
        <div ref={containerRef} className="opacity-0">
            {children}
        </div>
    );
};

export default PageTransition;