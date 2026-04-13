import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';


const ChangeLog: React.FC = () => {
    return (
        <Layout>
            <main className="w-full max-w-4xl mx-auto px-6 py-24 text-left flex-1">

                {/* Title */}
                <h1 className="text-3xl font-bold text-center mb-12 dark:text-white">
                    What's New?
                </h1>
                <div className="text-md text-gray-600 mt-2 mb-4">

                    <div className="mb-4 p-3 rounded bg-yellow-50 border border-yellow-200 text-sm text-yellow-800">
                        <span className='font-bold'>⚠️ Known Issues:</span>
                        <ol type="a">
                            <li>1. The timer may continue running after resetting the game or changing difficulty. This will be fixed in an upcoming update.</li>
                            <li>2. Advertising is currently disabled due to ongoing technical updates.</li>
                        </ol>
                    </div>

                </div>
                {/* Timeline container */}
                <div className="relative border-l border-gray-300 dark:border-gray-700 pl-6 space-y-10">

                    {/* Version 1.0.0 */}
                    <div className="relative">

                        {/* Dot */}
                        <div className="absolute -left-[20px] top-1 w-3.5 h-3.5 rounded-full bg-gray-400 dark:bg-gray-300"></div>

                        {/* Date */}
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            2026 • Version 1.0.0
                        </p>

                        {/* Card */}
                        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-6">

                            <div>
                                <h3 className="text-lg font-semibold dark:text-white mb-2">
                                    Improvements & Features
                                </h3>

                                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>
                                        Added a play/pause button for the countdown timer, allowing players to pause and resume gameplay anytime for a more relaxed and enjoyable experience.
                                        To try the new feature, go to homepage by clicking <Link to="/" className="underline hover:text-blue-500">here</Link>.
                                    </li>

                                    <li>
                                        Added a <Link to="/changeLog" className="underline hover:text-blue-500">What's New?</Link> page that displays version updates and changelogs to help players clearly understand what has been added, improved, or fixed over time. This ensures users are never confused after updates and can easily track the evolution of the game.

                                        <br /><br />

                                        Since this project is developed by a very small team (primarily a solo developer with occasional AI assistance), the changelog also serves as a transparent development log that shows continuous progress, even when updates are incremental or behind-the-scenes.
                                    </li>

                                    <li>
                                        Added <Link to="/sudokuTips" className="underline hover:text-blue-500">Tips</Link> and <Link to="/sudokuTips" className="underline hover:text-blue-500">FAQ</Link> pages to help players learn Sudoku more easily and improve their skills over time. The FAQ explains the basics, while the Tips section shares useful strategies to help players solve puzzles more confidently.
                                    </li>

                                </ul>
                            </div>

                        </div>
                    </div>

                </div>
            </main>
        </Layout>
    );
};

export default ChangeLog;