import React from 'react';

const BoardSkeleton: React.FC = () => {
    // Generate an array of 81 items for the 9x9 grid
    const cells = Array.from({ length: 81 }, (_, i) => i);

    return (
        // FIX 1: Removed the outer wrapper. Added mx-auto to center it.
        // This ensures it exactly matches the size of your real board without layout shift.
        <div
            className="grid grid-cols-9 w-full rounded-lg max-w-[600px] aspect-square mx-auto bg-white dark:bg-gray-800 shadow-sm"
            aria-label="Loading Sudoku board..."
            role="status"
        >
            {cells.map((index) => {
                const row = Math.floor(index / 9);
                const col = index % 9;

                // Subtle 3x3 block separation
                const isRightBoundary = col === 2 || col === 5;
                const isBottomBoundary = row === 2 || row === 5;

                return (
                    <div
                        key={index}
                        // FIX 2: Removed cell padding. Added `relative` positioning.
                        className={`
                            relative w-full h-full border border-gray-200 dark:border-gray-700 p-1 sm:p-1
                            ${isRightBoundary ? 'border-r-gray-300 dark:border-r-gray-600' : ''}
                            ${isBottomBoundary ? 'border-b-gray-300 dark:border-b-gray-600' : ''}
                        `}
                    >
                        {/* FIX 3: Removed rounded corners. Added `absolute inset-0`.
                            This makes the pulse fill the square seamlessly behind the borders. */}
                        <div
                            className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"
                            style={{ animationDelay: `${(row + col) * 75}ms` }}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default BoardSkeleton;