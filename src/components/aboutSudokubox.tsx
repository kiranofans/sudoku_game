import React, { useState } from "react";

const AboutSudoku: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full max-w-[800px] mx-auto my-4 px-4 md:px-0 flex flex-col items-stretch">
            <div className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex justify-between items-center px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none"
                >
                    <span className="text-[13px] text-gray-700 dark:text-gray-200 uppercase tracking-wider font-semibold">
                        About Sudoku
                    </span>

                    <span className="text-gray-500 font-bold text-lg leading-none">
                        {isOpen ? "−" : "+"}
                    </span>
                </button>

                {isOpen && (
                    <div className="px-4 pb-4 pt-2 text-left border-t border-gray-200 
                    max-w-2xl w-full mx-auto dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
                        <p className="italic mb-2">
                            “Sudoku (/suːˈdoʊkuː, -ˈdɒk-, sə-/; Japanese: 数独, romanized: sūdoku, lit. 'digit-single'; originally called Number Place)
                            is a logic-based, combinatorial number-placement puzzle.”
                        </p>
                        <p className="mb-2">
                            In classic Sudoku, the objective is to fill a 9 × 9 grid with digits so that each column,
                            each row, and each of the nine 3 × 3 subgrids that compose the grid
                            (also called "boxes", "blocks", or "regions") contains all of the digits from 1 to 9.
                            The puzzle setter provides a partially completed grid, which, for a well-posed puzzle, has a single solution.
                        </p>
                        <p className="text-[10px] text-gray-400">
                            — Source: <a href="https://en.wikipedia.org/wiki/Sudoku" className="underline hover:text-blue-500" target="_blank" rel="noopener noreferrer">Wikipedia</a>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AboutSudoku;