import React, { useState } from "react";

const AboutSudoku: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="mt-8 max-w-3xl mx-auto">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none"
            >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    About Sudoku
                </h2>
                <span className="text-gray-600 dark:text-gray-300 text-2xl">
                    {isOpen ? "−" : "+"}
                </span>
            </button>

            {isOpen && (
                <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 py-3 px-4 rounded-md mt-2">
                    “Sudoku (/suːˈdoʊkuː, -ˈdɒk-, sə-/; Japanese: 数独, romanized: sūdoku, lit. 'digit-single'; originally called Number Place)
                    is a logic-based, combinatorial number-placement puzzle.
                    In classic Sudoku, the objective is to fill a 9 × 9 grid with digits so that each column,
                    each row, and each of the nine 3 × 3 subgrids that compose the grid
                    (also called "boxes", "blocks", or "regions") contains all of the digits from 1 to 9.
                    The puzzle setter provides a partially completed grid, which, for a well-posed puzzle, has a single solution.
                    <span className="block mt-2 text-sm text-gray-500 dark:text-gray-400 not-italic">
                        — Source: <a href="https://en.wikipedia.org/wiki/Sudoku" className="underline hover:text-blue-500">Wikipedia</a>
                    </span>
                </blockquote>
            )}
        </section>
    );
};

export default AboutSudoku;