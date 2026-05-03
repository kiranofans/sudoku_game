import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
function About({ }) {
    return (
        <Layout>
            <title>About | Sudoku</title>
            <main className="sudoku-app" style={{ width: '100%', padding: '6rem 2rem 6rem', maxWidth: '900px', textAlign: 'left', flex: '1 0 auto' }}>
                <h1 className="text-3xl font-bold text-center mt-6 mb-8 dark:text-white md:mt-10">About this Site</h1>
                <div className="text-left space-y-6 text-lg leading-relaxed max-w-3xl mx-auto">
                    <p>
                        sudokuplays.com is a simple, fast, and distraction-free place to enjoy Sudoku anytime.
                    </p>

                    <p>
                        The goal of this site is to provide a clean,
                        smooth, convenient and accessible puzzle experience without unnecessary complexity.
                        Whether you're a beginner learning the basics or someone looking for a quick mental challenge,
                        sudokuplays.com offers a clean interface that lets you focus entirely on solving puzzles.
                    </p>

                    <p>
                        The game features a simple interface, responsive controls, and smooth performance directly in your browser.
                        Whether you're solving a quick puzzle during a break or challenging yourself to improve your logic skills,
                        this project aims to make Sudoku accessible and enjoyable for everyone.
                    </p>

                    <p>
                        Designed with simplicity in mind, sudokuplays.com runs entirely on the web with no downloads required.
                    </p>

                    {/* What you will find here */}
                    <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 mt-10 mb-4">What You Will Find Here</h2>

                    <ul className="list-disc pl-6 space-y-2">
                        <li>Multiple difficulty levels to match your skill</li>
                        <li>A responsive design that works on desktop and mobile</li>
                        <li>Helpful tools and tips to improve your solving techniques</li>
                        <li>A lightweight experience with fast loading and minimal clutter</li>
                    </ul>

                    {/* Why this Site Exists */}
                    <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 mt-10 mb-4">Why This Site Exists</h2>
                    <p>
                        sudokuplays.com was created to make Sudoku easy to access and
                        enjoyable without requiring downloads, accounts, or complicated features.
                        It’s built with performance and usability in mind, so you can start playing
                        instantly with almost no concerns about data collection or privacy.
                    </p>

                    {/* Continuous Improvement */}
                    <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 mt-10 mb-4">Continuous Improvement</h2>
                    <p>
                        The site is actively being improved with new features, better usability,
                        and more helpful content for players who want to sharpen their skills.
                    </p>
                </div>

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <a href="/" className="new-game-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
                        Back to Game
                    </a>
                </div>
            </main>
        </Layout>
    );
}

export default About;
