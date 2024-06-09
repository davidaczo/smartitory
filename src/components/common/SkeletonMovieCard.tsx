import React from 'react';

const SkeletonMovieCard: React.FC = () => {
    return (
        <div className="p-4 border rounded shadow-xl border-gray-200 animate-pulse">
            <div className="relative w-full pb-[150%] bg-gray-300 rounded">
            </div>
            <div className="flex flex-col justify-center align-middle mt-4">
                <div className="h-5 w-2/3 mx-auto bg-gray-200 rounded-full mb-4"></div>
                <div className="h-4 w-1/3 mx-auto bg-gray-200 rounded-full"></div>
            </div>
        </div>
    );
};

export default SkeletonMovieCard;
