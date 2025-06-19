import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
    return (
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm">
                <div>
                    <img src={logo} className="mb-5 w-2/5" alt="" />
                    <p className="w-full md:w-2/3 text-gray-600">
                        "Discover trendy and affordable dresses for every
                        occasion. From casual wear to party styles, shop the
                        latest collections with easy checkout and fast
                        delivery."
                    </p>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">Old.Report</p>
                    <ul className="fle flex-col gap-1 text-gray-600">
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>+91-7391378293</li>
                        <li>contact@Oldreport.com</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className="py-5 text-sm text-center">
                    Copyright 2025@Oldreport.com - All Right Reserved
                </p>
            </div>
        </div>
    );
};

export default Footer;
