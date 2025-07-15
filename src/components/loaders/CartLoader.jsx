import React from "react";

const CartLoader = () => {
    return (
        <div className="flex items-center justify-center w-full min-h-[200px] bg-white">
            <div className="flex flex-row gap-4 w-full max-w-xl animate-pulse">
                <div className="bg-gray-300 w-20 h-12 rounded-full"></div>
                <div className="flex flex-col gap-2 flex-1">
                    <div className="bg-gray-300 w-full h-5 rounded-full"></div>
                    <div className="bg-gray-300 w-3/4 h-5 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default CartLoader;