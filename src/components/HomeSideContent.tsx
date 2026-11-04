import React from 'react';
import { ArrowLinkButtonUI } from './SmallUiWidgets';

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
                        About this SudokuPlays Game Site
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
                        How to Play
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-2.5">
                        New to SudokuPlays? Open the <b>Quick Guide</b> dropdown on the top right corner for a quick overview,
                        or explore <b>How SudokuPlays Works</b> for more details about the game rules, controls, hints, and scoring.                    </p>

                    <ArrowLinkButtonUI
                        label="Explore How SudokuPlays Works (the user guide)"
                        href="/detailedGuide"
                    />
                </section>

                {/* Block 3: Sudoku tips */}
                <section className="pt-6">
                    <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-2">
                        Sudoku Tips
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-2.5">
                        Improve your Sudoku skills with practical tips and proven techniques, from beginner basics to more advanced strategies.
                    </p>
                    <ArrowLinkButtonUI
                        label="Explore all Sudoku tips & strategies"
                        href="/sudokuTips"
                    />
                </section>
            </div>
        </aside>
    );
};

export default HomeSideContent;

