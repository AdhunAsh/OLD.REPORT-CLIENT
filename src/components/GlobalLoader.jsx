import React from 'react';

const GlobalLoader = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center space-y-8">
                <div className="text-4xl font-bold text-black tracking-wider animate-pulse">
                    OLD.REPORT
                </div>
                
                <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-black rounded-full w-full animate-pulse"></div>
                </div>
                
                <p className="text-gray-600 text-sm">Loading your experience...</p>
            </div>
        </div>
    );
};

export default GlobalLoader;