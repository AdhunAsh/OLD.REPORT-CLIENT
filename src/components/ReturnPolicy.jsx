import React from "react";
import quality_icon from "../assets/quality_icon.png";
import Policy from "./Policy";

const ReturnPolicy = () => {
    return (
        <div className="text-center px-4">
            <img src={quality_icon} className="w-12 m-auto mb-5" alt="" />
            <p className="font-semibold mb-2">Return and Exchange Policy</p>
            <Policy />
            {/* <ul className="text-gray-400 text-sm md:text-base space-y-2 max-w-md mx-auto text-left">
                <li className="flex items-center justify-center gap-2">
                    <span>Orders once placed cannot be cancelled.</span>
                    <span className="text-green-600 mt-1">✅</span>
                </li>
                <li className="flex items-center justify-center gap-2">
                    <span>No Exchange. No Return. No Refund.</span>
                    <span className="text-red-500 mt-1">❌</span>
                </li>
                <li className="flex items-center justify-center gap-2">
                    <span>
                        Replacement only if product is damaged or defective.
                    </span>
                    <span className="text-blue-600 mt-1">🔁</span>
                </li>
                <li className="flex items-center justify-center gap-2">
                    <span>
                        Unboxing video is mandatory for replacement eligibility.
                    </span>
                    <span className="text-yellow-600 mt-1">📦</span>
                </li>
            </ul> */}
        </div>
    );
};

export default ReturnPolicy;
