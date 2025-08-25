import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
    return (
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr] gap-14 my-10 mt-20 text-sm">
                <div>
                    <img src={logo} className="mb-1 w-36" alt="" />
                    <p className="w-full md:w-2/3 text-gray-600 lg:text-base">
                        "The old report (Tor)— streetwear made for the bold, the creative, and the unapologetic. Designed for those who move different."
                    </p>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>+91-7391378293</li>
                        <li>contact@Oldreport.in</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className="py-5 text-sm text-center">
                    Copyright 2025@Oldreport.in - All Right Reserved
                </p>
            </div>
        </div>
    );
};

export default Footer;
