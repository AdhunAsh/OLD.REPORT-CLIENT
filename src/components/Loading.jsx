import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loading = () => {
    const textRef = useRef(null);

    useEffect(() => {
        const letters = textRef.current.children;
        
        gsap.fromTo(letters, 
            { opacity: 0.3 },
            { 
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut"
            }
        );
    }, []);

    return (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
            <div ref={textRef} className="text-2xl font-bold text-gray-800 tracking-wider">
                {'oldreport.in'.split('').map((letter, index) => (
                    <span key={index} className="inline-block">
                        {letter === '.' ? '.' : letter}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Loading;