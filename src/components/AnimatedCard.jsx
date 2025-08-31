import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const AnimatedCard = ({ children, className = "" }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(cardRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
    }, [children]);

    return (
        <div
            ref={cardRef}
            className={`bg-white rounded opacity-0 ${className}`}
        >
            {children}
        </div>
    );
};

export default AnimatedCard;