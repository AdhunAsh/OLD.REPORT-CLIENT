import React from "react";
import { ArrowRight } from "lucide-react";
import SliderDesk from "./SliderDesk";
import Slider from './Slider'
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate('/collection');
    };

    return (
        <>
            <section className="relative hidden md:flex flex-row items-center">
                {/* Left: Text Content */}
                <div className="flex-1 py-20">
                    <h1 className="text-6xl lg:text-7xl font-serif font-bold leading-tight text-gray-900">
                        Redefine <br /> Your Style
                    </h1>

                    <p className="mt-6 text-lg text-gray-600 max-w-lg">
                        Discover curated collections inspired by elegance,
                        minimalism, and timeless fashion. Perfectly crafted for
                        the modern you.
                    </p>

                    <div className="mt-8 flex gap-4">
                        <button
                            type="button"
                            onClick={handleClick}
                            className="px-7 py-3 lg:px-8 lg:py-3 text-sm lg:text-lg font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2"
                        >
                            Shop Now <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Right: Abstract fashion block */}
                {/* <div className="flex-1 relative w-full bg-gradient-to-br from-[#f7e9dc] via-[#e0d4c2] to-[#c7b198] flex items-center justify-center -z-100"> */}
                {/* Floating background blobs */}
                {/* <div className="absolute w-72 h-72 rounded-full bg-pink-200 opacity-40 blur-3xl -top-10 -left-10"></div>
        <div className="absolute w-80 h-80 rounded-full bg-purple-200 opacity-40 blur-3xl bottom-10 right-0"></div> */}

                {/* Overlay text (editorial style) */}
                {/* <SliderDesk />
      </div> */}

                <div className="flex-1 relative w-full ">
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
