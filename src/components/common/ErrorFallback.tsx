import React from 'react';

interface ErrorFallbackProps {
    errorMessage: string;
    onRetry: () => void;
    goToHome: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ errorMessage, onRetry, goToHome }) => {

    return (
        <div className="flex w-full h-full flex-col items-center justify-center p-4">
            <p className="text-xl font-semibold mb-2">Something Went Wrong</p>
            <p className="text-gray-600 mb-4">{errorMessage}</p>
            <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-2"
                onClick={onRetry}
            >
                Retry
            </button>
            <button
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                onClick={goToHome}
            >
                Go to Home Page
            </button>
        </div>
    );
};

export default ErrorFallback;
