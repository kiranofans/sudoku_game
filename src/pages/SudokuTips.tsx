import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ExpandableBox from '@/components/ExpandableBox';
import Layout from '@/components/Layout';

// Define the type
type TipItem = {
    title: string;
    description: string;
};

// Function that returns the Tips array
const getTips = (): TipItem[] => {
    return [
        {
            title: "Cross-Hatching",
            description: "Cross-hatching is one of the most fundamental scanning techniques in Sudoku. To use it, pick a number from 1–9 and scan each 3×3 block to see where that number can legally go. Look at the rows and columns that already contain that number — they eliminate entire rows and columns from your candidate pool within the block. Wherever only one cell remains uneliminated in that block, place the number there. Repeat for every block on the board. This technique alone can solve many easy and medium puzzles without any other strategy."
        },
        {
            title: "Naked Singles & Hidden Singles",
            description: "A Naked Single occurs when a cell has only one possible candidate left after eliminating all numbers already used in its row, column, and 3×3 block. This is the simplest form of deduction — just place that one number.\n\nA Hidden Single is subtler. A cell may have several candidates, but one of those candidates appears in only one cell within a given row, column, or block. Even though other numbers could theoretically go there too, that specific number has nowhere else to go — making it a hidden but forced placement. Scanning for hidden singles significantly speeds up solving medium-difficulty puzzles."
        },
        {
            title: "Naked Pairs",
            description: "A Naked Pair occurs when exactly two cells in the same row, column, or 3×3 block each contain the same two candidates — and no other candidates. Since those two numbers must be placed in those two cells (in some order), you can safely eliminate both numbers from every other cell in that shared row, column, or block.\n\nFor example, if cells A and B both contain only {3, 7}, you know that 3 and 7 belong exclusively to those two cells. Any other cell in the same region that lists 3 or 7 as a candidate can have those candidates removed. This often unlocks placements elsewhere on the board."
        },
        {
            title: "Pointing Pairs / Triples",
            description: "Within a 3×3 block, if a specific candidate number is restricted to only two or three cells, and those cells all fall in the same row or column, that candidate can be eliminated from the rest of that row or column outside the block.\n\nFor example, if the number 5 can only appear in two cells within a block, and both of those cells are in row 4, then no other cell in row 4 (outside that block) can contain a 5. This is called a Pointing Pair. A Pointing Triple works the same way with three cells. This is a powerful technique for clearing candidates and is one of the first 'intermediate' strategies to learn."
        },
        {
            title: "X-Wing",
            description: "The X-Wing is an advanced elimination technique. First, find a candidate number that appears in exactly two cells in each of two separate rows — and crucially, those two cells in both rows share the exact same two columns. This forms a rectangle pattern on the grid.\n\nBecause the candidate must appear in one of the two positions in row A and one of the two positions in row B, the candidate is locked to those two columns across those rows. This means you can safely eliminate that candidate from every other cell in those two columns. The same logic applies if you start with columns instead of rows. X-Wing often unlocks a chain of deductions on harder puzzles."
        },
        {
            title: "Swordfish",
            description: "Swordfish is an extended version of X-Wing that involves three rows and three columns. Find a candidate number that appears in exactly two or three cells in each of three rows, and those appearances collectively span only three columns.\n\nBecause the candidate must be placed in exactly one cell per row, and all those possible placements are confined to three columns, the candidate can be eliminated from every other cell in those three columns. The pattern is harder to spot visually, but the logic is the same as X-Wing scaled up. Swordfish (and its 4-row equivalent, Jellyfish) are essential tools for cracking expert-level Sudoku puzzles without guessing."
        }
    ];
};

const SudokuTips: React.FC = () => {
    const tips = getTips();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <Layout>
            <main className="sudoku-app" style={{ width: '100%', padding: '6rem 2rem 6rem', maxWidth: '900px', textAlign: 'left', margin: '0 auto', flex: '1 0 auto' }}>
                <h1 className="text-3xl font-bold text-center mt-6 mb-8 dark:text-white">
                    Pro Tips & Strategies
                </h1>

                <div className="w-full space-y-3 max-w-[800px] mx-auto">
                    {tips.map((tip, index) => (
                        <ExpandableBox
                            key={index}
                            title={tip.title}
                            isOpen={openIndex === index}
                            onToggle={() => toggle(index)}
                        >
                            {tip.description.split('\n\n').map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </ExpandableBox>
                    ))}
                </div>

                <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
                    Ready to put these strategies to the test?
                </div>
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <Link to="/" className="new-game-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
                        Play Sudoku
                    </Link>
                </div>
            </main>
        </Layout>
    );
};

export default SudokuTips;
