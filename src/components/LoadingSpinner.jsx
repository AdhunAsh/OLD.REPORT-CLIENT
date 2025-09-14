import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="flex space-x-2 mb-4">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="w-3 h-3 bg-black rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.2}s` }}
                        />
                    ))}
                </div>
                <p className="text-gray-600 text-sm font-medium">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;