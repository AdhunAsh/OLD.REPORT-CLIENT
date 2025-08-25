import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import hero_image from "../assets/hero1.webp";
import Slider from "./Slider";

const Hero = () => {
    const heroRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);
    const lineRef = useRef(null);
    const titleRef = useRef(null);
    const shopRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(
            heroRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5 }
        )
            .fromTo(
                lineRef.current,
                { width: 0 },
                { width: "2rem", duration: 0.8, ease: "power2.out" },
                "-=0.3"
            )
            .fromTo(
                textRef.current,
                { opacity: 0, x: -30 },
                { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
                "-=0.5"
            )
            .fromTo(
                titleRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
                "-=0.4"
            )
            .fromTo(
                shopRef.current,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
                "-=0.3"
            )
            .fromTo(
                imageRef.current,
                { opacity: 0, scale: 1.1 },
                { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
                "-=0.8"
            );
    }, []);

    return (
        <>
            <div
                ref={heroRef}
                className="hidden sm:flex flex-col sm:flex-row border border-gray-400 opacity-0 "
            >
                <div className="width-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
                    <div className="text-[#414141]">
                        <div className="flex items-center gap-2">
                            <p
                                ref={lineRef}
                                className="w-0 md:w-0 h-[2px] bg-[#414141]"
                            ></p>
                            <p
                                ref={textRef}
                                className="font-medium text sm: md:text-base opacity-0"
                            >
                                OUR BEST SELLER
                            </p>
                        </div>
                        <h1
                            ref={titleRef}
                            className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed opacity-0"
                        >
                            Latest Arrivals
                        </h1>
                        <div
                            ref={shopRef}
                            className="flex items-center gap-2 opacity-0"
                        >
                            <p className="font-semibold text-sm md:text-base">
                                SHOP NOW
                            </p>
                            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
                        </div>
                    </div>
                </div>

                <img
                    ref={imageRef}
                    className="w-full sm:w-1/2 opacity-0"
                    src={hero_image}
                    alt=""
                />
            </div>

            <div className="flex sm:hidden">
                <Slider />
            </div>
        </>
    );
};

export default Hero;
