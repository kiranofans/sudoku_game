import React from 'react';

export const HomeSideContent: React.FC = () => {
    return (
        <aside
            aria-label="Sudoku game information and guide"
            className="w-full max-w-[720px] lg:max-w-[340px] xl:max-w-[380px] flex-shrink-0 text-left px-2 sm:px-0"
        >
            <div className="divide-y divide-gray-200 dark:divide-gray-700/80">
                {/* Block 1: About this Sudoku game */}
                <section className="pb-6 lg:pt-1">
                    <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-2">
                        About this Sudoku game
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        Welcome to SudokuPlays, a free and clean online Sudoku experience designed for both casual solvers and daily logic puzzle enthusiasts.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mt-2">
                        Enjoy seamless gameplay with no sign-up required, built-in timer and error tracking, intelligent hints, and responsive controls optimized for desktop and mobile play.
                    </p>
                </section>

                {/* Block 2: How to play */}
                <section className="py-6">
                    <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-2">
                        How to play
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-2.5">
                        Fill each cell of the 9×9 grid so that every row, column, and 3×3 box contains numbers 1 through 9 without repeating.
                    </p>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                        <li className="flex items-start gap-1.5">
                            <span className="text-gray-400 dark:text-gray-500 mt-0.5">•</span>
                            <div>
                                <strong className="font-semibold text-gray-900 dark:text-gray-100">Select & Input:</strong> Click any cell to select it, then tap a number or use keyboard keys 1–9.
                            </div>
                        </li>
                        <li className="flex items-start gap-1.5">
                            <span className="text-gray-400 dark:text-gray-500 mt-0.5">•</span>
                            <div>
                                <strong className="font-semibold text-gray-900 dark:text-gray-100">Pencil Mode:</strong> Jot down candidate possibilities in tricky cells to map out your moves.
                            </div>
                        </li>
                        <li className="flex items-start gap-1.5">
                            <span className="text-gray-400 dark:text-gray-500 mt-0.5">•</span>
                            <div>
                                <strong className="font-semibold text-gray-900 dark:text-gray-100">Mistakes & Hints:</strong> Stay alert — 10 mistakes ends the game. Use hints when you need a nudge.
                            </div>
                        </li>
                    </ul>
                </section>

                {/* Block 3: Sudoku tips */}
                <section className="pt-6">
                    <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-2">
                        Sudoku Tips
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-2.5">
                        Improve your Sudoku skills with practical tips and proven techniques, from beginner basics to more advanced strategies.
                    </p>
                    <div className="mt-4">
                        <a
                            href="/sudokuTips"
                            className="inline-flex items-center text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                        >
                            Explore all Sudoku tips & strategies
                            <svg className="ml-1 w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L10.94 10 7.23 6.29a.75.75 0 1 1 1.06-1.06l4.24 4.24a.75.75 0 0 1 0 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </section>
            </div>
        </aside>
    );
};

export default HomeSideContent;

