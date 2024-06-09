import React from 'react';

const NoMoviesFound = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <p className="text-xl font-semibold mb-2">No Movies Found</p>
            <p className="text-gray-600 mb-4">We couldn't find any movies matching your search. Please try a different search term.</p>
            <button
                className="button"
                onClick={() => window.location.reload()}
            >
                Browse Trending Movies
            </button>
        </div>
    );
};

export default NoMoviesFound;
