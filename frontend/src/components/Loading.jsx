import React from 'react';

const Loading = ({ fullPage = false }) => {
    const spinner = (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="text-text-secondary font-medium animate-pulse text-sm">Loading your portfolio...</p>
        </div>
    );

    if (fullPage) {
        return (
            <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-[200] flex items-center justify-center">
                {spinner}
            </div>
        );
    }

    return <div className="p-20">{spinner}</div>;
};

export default Loading;
