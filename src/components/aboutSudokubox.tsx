import React, { useState } from "react";
import ExpandableBox from "./ExpandableBox";

const AboutSudoku: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full max-w-[800px] mx-auto my-4 px-4 md:px-0 flex flex-col items-stretch">
            <ExpandableBox
                title="About Sudoku"
                isOpen={isOpen}
                onToggle={() => setIsOpen(!isOpen)}
            >
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
            </ExpandableBox>
        </div>
    );
};

export default AboutSudoku;