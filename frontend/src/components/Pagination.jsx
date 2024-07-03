
import React from 'react';

const Paginations = ({ handlePrevious, handleNext, page, pageCount, setPage }) => {
    const renderPageButtons = () => {
        const buttons = [];

        // First Page Button
        buttons.push(
            <button
                key={1}
                onClick={() => setPage(1)}
                className={`px-4 py-2 mx-1 rounded-full border ${page === 1 ? 'border-aqua' : ''}`}
            >
                1
            </button>
        );

        // Left Ellipsis Button
        if (page > 3) {
            buttons.push(
                <button
                    key="left-ellipsis"
                    disabled
                    className="px-4 py-2 mx-1 rounded-full border-none"
                >
                    ...
                </button>
            );
        }

        // Middle Page Buttons
        for (let i = Math.max(2, page - 1); i <= Math.min(pageCount - 1, page + 1); i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`px-4 py-2 mx-1 rounded-full border ${page === i ? 'border-aqua' : ''}`}
                >
                    {i}
                </button>
            );
        }

        // Right Ellipsis Button
        if (page < pageCount - 2) {
            buttons.push(
                <button
                    key="right-ellipsis"
                    disabled
                    className="px-4 py-2 mx-1 rounded-full border-none"
                >
                    .....
                </button>
            );
        }

        // Last Page Button
        if (pageCount > 1) {
            buttons.push(
                <button
                    key={pageCount}
                    onClick={() => setPage(pageCount)}
                    className={`px-4 py-2 mx-1 rounded-full border ${page === pageCount ? 'border-aqua' : ''}`}
                >
                    {pageCount}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div className="my-4 flex justify-center">
            {pageCount > 0 && (
                <div className="flex justify-end">
                    <button
                        onClick={handlePrevious}
                        disabled={page === 1}
                        className="px-4 py-2 mx-1 rounded border-none cursor-pointer disabled:opacity-50"
                    >
                        {'<< <'}
                    </button>
                    {renderPageButtons()}
                    <button
                        onClick={handleNext}
                        disabled={page === pageCount}
                        className="px-4 py-2 mx-1 rounded border-none cursor-pointer disabled:opacity-50"
                    >
                        {'> >>'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Paginations;
