import React from "react";
import { ThreeDot } from "react-loading-indicators";

const HomeLoader = () => {
    return (
        <div className="w-full flex justify-center items-center min-h-[300px]">
            <div className="animate-pulse flex flex-col items-center gap-4 w-full max-w-xl">
                <div>
                    <div className="w-72 h-6 bg-slate-400 rounded-md"></div>
                    <div className="w-40 h-4 bg-slate-400 mx-auto mt-3 rounded-md"></div>
                </div>
                <div className="h-7 bg-slate-400 w-full rounded-md"></div>
                <div className="h-7 bg-slate-400 w-full rounded-md"></div>
                <div className="h-7 bg-slate-400 w-full rounded-md"></div>
                <div className="h-7 bg-slate-400 w-1/2 rounded-md"></div>
            </div>
        </div>
    );
};

export default HomeLoader;
