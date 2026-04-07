import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import packageJson from '../../package.json';
import { PrivacyPolicyModal, TermsAndConditionsModal } from '../components/Modals';
import ThemeSelector from '@/components/ThemeSelector';

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
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const tips = getTips();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    const currentYear = new Date().getFullYear();

    return (
        <div className="wrapper">
            <header className="menu-bar">
                <div className="logo-title-container">
                    <Link to="/" className="logo-link" aria-label="Go to homepage" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src="/images/png/logo_sudoku1.png" alt="Logo" className="logo" />
                    </Link>
                    <div className="title-score-wrapper">
                        <div className="title-tagline-container">
                            <h2 className='game-title'>Sudoku</h2>
                        </div>
                    </div>
                </div>
                <div className='controls-row'>
                    <Link to="/sudokuTips" className="header-nav-item desktop-only-nav">Tips</Link>
                    <span className="header-nav-separator desktop-only-nav">|</span>
                    <Link to="/faq" className='header-nav-item desktop-only-nav'>FAQ</Link>
                    <span className="header-nav-separator desktop-only-nav">|</span>
                    <Link to="/about" className="header-nav-item desktop-only-nav">About</Link>
                    <span className="header-nav-separator desktop-only-nav">|</span>
                    <Link to="/contact" className="header-nav-item desktop-only-nav">Contact</Link>
                    <ThemeSelector />
                </div>
            </header>
            <hr className="divider" />

            <main className="sudoku-app" style={{ width: '100%', padding: '8rem 2rem 6rem', maxWidth: '900px', textAlign: 'left', margin: '0 auto', flex: '1 0 auto' }}>
                <h1 className="text-3xl font-bold text-center mt-6 mb-8 dark:text-white">
                    Pro Tips & Strategies
                </h1>

                <div className="w-full space-y-3">
                    {tips.map((tip, index) => (
                        <div
                            key={index}
                            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded"
                        >
                            <button
                                onClick={() => toggle(index)}
                                className="w-full flex justify-between items-center px-4 h-8 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none"
                            >
                                <span className="text-[12px] text-gray-700 dark:text-gray-200 tracking-wider font-semibold uppercase text-left">
                                    {tip.title}
                                </span>
                                <span className="text-gray-500 font-bold text-lg leading-none">
                                    {openIndex === index ? "−" : "+"}
                                </span>
                            </button>

                            {openIndex === index && (
                                <div className="w-full min-w-0 overflow-hidden">
                                    <div className="px-4 pb-4 pt-2 text-left border-t border-gray-200 w-full dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 break-words space-y-3">
                                        {tip.description.split('\n\n').map((para, i) => (
                                            <p key={i}>{para}</p>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
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

            <footer className="site-footer">
                <div className="footer-copyright">
                    <span>&copy; {currentYear} sudokuplays.com v{packageJson.version} | All rights reserved.</span>
                </div>
                <div className="footer-links">
                    <button className="footer-btn" onClick={() => setShowPrivacyModal(true)}>Privacy Policy</button>
                    <button className="footer-btn" onClick={() => setShowTermsModal(true)}>Terms & Conditions</button>
                </div>
                <div className="social-links">
                    <a href="https://github.com/kiranofans" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                        </svg>
                    </a>
                </div>
            </footer>

            <PrivacyPolicyModal
                isOpen={showPrivacyModal}
                onClose={() => setShowPrivacyModal(false)}
            />
            <TermsAndConditionsModal
                isOpen={showTermsModal}
                onClose={() => setShowTermsModal(false)}
            />
        </div>
    );
};
export default SudokuTips;
