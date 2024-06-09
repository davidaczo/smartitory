import React from 'react';
import { observer } from 'mobx-react-lite';
import { movieStore } from '../../mobx/movieStore';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination: React.FC = () => {
    const renderPageButtons = () => {
        const visiblePages = [];
        const totalPages = movieStore.getTotalPages();
        const currentPage = movieStore.getCurrentPage();
        const pageCount = Math.min(totalPages, 5);

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + pageCount - 1);

        if (endPage - startPage + 1 < pageCount) {
            startPage = Math.max(1, endPage - pageCount + 1);
        }

        if (startPage > 1) {
            visiblePages.push(1);
            if (startPage > 2) {
                visiblePages.push('...');
            }
        }

        for (let page = startPage; page <= endPage; page++) {
            visiblePages.push(page);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                visiblePages.push('...');
            }
            visiblePages.push(totalPages);
        }

        return visiblePages.map((page, index) => (
            typeof page !== 'number' ?
                <p key={index} className='font-medium mx-1 px-3 py-1'> ...</p> :
                <button
                    key={index}
                    onClick={() => movieStore.setCurrentPage(page)}
                    className={`font-medium mx-1 px-3 py-1 border rounded-lg 
                        ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200 cursor-pointer'}`}
                >
                    {page}
                </button>
        ));
    };

    return (
        <div className="flex justify-center mt-8">
            {movieStore.currentPage > 1 && (
                <button
                    onClick={() => movieStore.setCurrentPage(movieStore.currentPage - 1)}
                    className="font-medium mx-1 px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center"
                >
                    <FaChevronLeft />
                </button>
            )}
            {renderPageButtons()}
            {movieStore.currentPage < movieStore.getTotalPages() && (
                <button
                    onClick={() => movieStore.setCurrentPage(movieStore.currentPage + 1)}
                    className="font-medium mx-1 px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center"
                >
                    <FaChevronRight />
                </button>
            )}
        </div>
    );
};

export default observer(Pagination);
