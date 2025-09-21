import React from 'react';

const AnimatedCard = ({ children, className = "" }) => {
    return (
        <div className={`bg-white rounded ${className}`}>
            {children}
        </div>
    );
};

export default AnimatedCard;