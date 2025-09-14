import React from 'react';

const Loading = () => {
    return (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
            <div className="text-3xl sm:text-5xl font-bold text-gray-800 tracking-wider">
                <div className="flex items-center space-x-1">
                    {'oldreport'.split('').map((letter, index) => (
                        <span 
                            key={index} 
                            className="inline-block animate-pulse"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {letter}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Loading;