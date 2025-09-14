import React from 'react';

const ButtonLoader = ({ loading, children, ...props }) => {
    return (
        <button {...props} disabled={loading}>
            {loading ? (
                <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Loading...
                </div>
            ) : (
                children
            )}
        </button>
    );
};

export default ButtonLoader;