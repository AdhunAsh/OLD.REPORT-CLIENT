import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SliderDesk from "./SliderDesk";
import Slider from './Slider'
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/collection')
    };

    return (
        <>
            <section className="relative hidden md:flex flex-row items-center">
                {/* Left: Text Content */}
                <div className="flex-1 py-20">
                    <motion.h1
                        className="text-6xl lg:text-7xl font-serif font-bold leading-tight text-gray-900"
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Redefine <br /> Your Style
                    </motion.h1>

                    <motion.p
                        className="mt-6 text-lg text-gray-600 max-w-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        Discover curated collections inspired by elegance,
                        minimalism, and timeless fashion. Perfectly crafted for
                        the modern you.
                    </motion.p>

                    <motion.div
                        className="mt-8 flex gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <button
                            onClick={handleClick}
                            className="px-7 py-3 lg:px-8 lg:py-3 text-sm lg:text-lg font-medium text-white bg-black rounded-full hover:bg-gray-800 transition flex items-center"
                        >
                            Shop Now <ArrowRight size={20} />
                        </button>
                    </motion.div>
                </div>

                {/* Right: Abstract fashion block */}
                {/* <div className="flex-1 relative w-full bg-gradient-to-br from-[#f7e9dc] via-[#e0d4c2] to-[#c7b198] flex items-center justify-center -z-100"> */}
                {/* Floating background blobs */}
                {/* <div className="absolute w-72 h-72 rounded-full bg-pink-200 opacity-40 blur-3xl -top-10 -left-10"></div>
        <div className="absolute w-80 h-80 rounded-full bg-purple-200 opacity-40 blur-3xl bottom-10 right-0"></div> */}

                {/* Overlay text (editorial style) */}
                {/* <SliderDesk />
      </div> */}

                <div className="flex-1 relative w-full bg-gradient-to-r from-gray-50 via-gray-900 to-gray-50">
                    <div className="w-4/5 mx-auto">
                        <SliderDesk />
                    </div>
                </div>
            </section>

            <div className="flex md:hidden">
                <Slider />
            </div>
        </>
    );
};

export default HeroSection;
