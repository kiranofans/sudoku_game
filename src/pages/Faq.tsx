import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ExpandableBox from '@/components/ExpandableBox';
import Layout from '@/components/Layout';

// Define the type
type FAQItem = {
    question: string;
    answer: string;
};

// Function that returns the FAQ array
const getFAQs = (): FAQItem[] => {
    return [
        {
            question: "What is Sudoku?",
            answer:
                "Sudoku is a logic-based number puzzle where you fill a 9×9 grid so that each row, column, and 3×3 box contains the digits 1 to 9 without repetition.",
        },
        {
            question: "Is sudokuplays.com free to use?",
            answer:
                "Yes, the site is completely free to use without downloads or accounts. "

        },
        {
            question: "Do I need an account to play?",
            answer: "No sign up or login is required. You can start playing instantly.",
        },
        {
            question: "What difficulty levels are available?",
            answer:
                "We offer multiple difficulty levels from easy to hard for all players.",
        },
        {
            question: "Does this site work on mobile?",
            answer:
                "Yes, the site is fully responsive and works on all devices.",
        },
        {
            question: "How can I improve at Sudoku?",
            answer:
                "you can improve Sudoku skill by playing regularly and learn strategies from the Tips page, like scanning and pencil marks.",
        },
    ];
};

const faq: React.FC = () => {
    const faqs = getFAQs();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <Layout>
            <main className="sudoku-app" style={{ width: '100%', padding: '6rem 2rem 6rem', maxWidth: '900px', textAlign: 'left', margin: '0 auto', flex: '1 0 auto' }}>
                <h1 className="text-3xl font-bold text-center mt-6 mb-8 dark:text-white">
                    FAQ
                </h1>

                <div className="space-y-3 max-w-[800px] w-full mx-auto">
                    {faqs.map((faq, index) => (
                        <ExpandableBox
                            key={index}
                            title={faq.question}
                            isOpen={openIndex === index}
                            onToggle={() => toggle(index)}
                        >
                            {index === 0 ? (
                                <div>
                                    <p className="italic mb-2 mx-auto">
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
                            ) : index === 1 ? (
                                <span>
                                    Yes, SudokuPlays.com is completely free to use. You can play all puzzles directly in your browser without creating an account or downloading anything.
                                    <br /><br />
                                    To help support the site and keep it free for everyone, we display Google AdSense ads. These ads do not affect gameplay and no personal account is required to access any features.
                                </span>
                            ) : index === 2 ? (
                                <span className="text-sm">
                                    No — you don’t need to sign up or log in. You can start playing instantly.
                                    <br /><br />
                                    We do not require any personal information.
                                    <br />To improve your experience, the site uses your browser’s local storage to temporarily save things like your game progress and scores (up to 24 hours).
                                    <br /><br />
                                    This data stays on your device and is not sent to our servers.
                                </span>
                            ) : index == 3 ? (
                                <span className="text-sm">
                                    We offer 5 difficulty levels to suit all players: Very Easy, Easy, Medium, Hard, and Expert.
                                    <br /><br />
                                    Each level varies in puzzle complexity and the number of starting clues.
                                    Easier levels provide more guidance, while harder levels require deeper logic and strategy.

                                    o keep the game challenging and fair, each difficulty level applies a different score penalty for mistakes.
                                    <br /><br />Higher difficulty levels result in greater point deductions, rewarding more accurate and careful play.
                                </span>
                            ) : index === 4 ? (
                                <span className="text-sm">
                                    Yes, the site is fully responsive and designed to work smoothly across all devices, including desktops, tablets, and smartphones.

                                    <br /><br />We are continuously improving the layout and interface to better fit a wide range of screen sizes and real-world devices, ensuring a consistent and comfortable gameplay experience.</span>
                            ) :
                                index === 5 ? (
                                    <span>
                                        You can improve Sudoku skill by playing regularly and learning strategies from the <Link to="/sudokuTips" className="underline hover:text-blue-500">Tips page</Link>, like scanning and pencil marks.
                                    </span>
                                ) : (
                                    faq.answer
                                )}
                        </ExpandableBox>
                    ))}
                </div>

                <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
                    Still have questions? Visit the Contact page.
                </div>
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <Link to="/" className="new-game-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
                        Back to Game
                    </Link>
                </div>
            </main>
        </Layout>
    );
};

export default faq;
