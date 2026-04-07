import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import packageJson from '../../package.json';
import { PrivacyPolicyModal, TermsAndConditionsModal } from '../components/Modals';
import ThemeSelector from '@/components/ThemeSelector';
import ExpandableBox from '@/components/ExpandableBox';

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
            question: "Is SudokuPlays free to use?",
            answer:
                "Yes, the site is completely free to use without downloads or accounts.",
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
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const faqs = getFAQs();
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

            {/* content here */}
            <main className="sudoku-app" style={{ padding: '8rem 2rem 6rem', maxWidth: '900px', textAlign: 'center', margin: '0 auto', flex: '1 0 auto' }}>
                <h1 className="text-3xl font-bold text-center mt-6 mb-8 dark:text-white">
                    FAQ
                </h1>

                <div className="space-y-4 max-w-[800px] w-full mx-auto">
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
                            ) : faq.question === "How can I improve at Sudoku?" ? (
                                <span>
                                    you can improve Sudoku skill by playing regularly and learn strategies from the <Link to="/sudokuTips" className="underline hover:text-blue-500">Tips page</Link>, like scanning and pencil marks.
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

            <footer className="site-footer">
                <div className="footer-copyright">
                    <span>&copy; {currentYear} sudokuplays.com.com v{packageJson.version} | All rights reserved.</span>
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
export default faq;
