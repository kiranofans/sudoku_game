import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const ChangeLog: React.FC = () => {
    return (
        <Layout>
            <main className="sudoku-app" style={{ width: '100%', padding: '6rem 2rem 6rem', maxWidth: '900px', textAlign: 'left', margin: '0 auto', flex: '1 0 auto' }}>
                <h1 className="text-3xl font-bold text-center mt-6 mb-8 dark:text-white">What's New?</h1>
                <div className="text-left space-y-6 text-lg leading-relaxed max-w-3xl mx-auto">
                    <h3 className='text-xl font-bold dark:text-white'>
                        Here's what's new in the latest update in version 1.0.0:
                    </h3>
                    <ul className="list-disc pl-6 space-y-2 text-md">
                        <li><span>We added a play/pause button for the countdown timer, so players can pause the game when needed and continue without pressure, making the experience more comfortable and enjoyable.</span></li>
                        <li><span>We added a “What’s New” page that displays version updates and changelogs to help players clearly understand what has been added, improved, or fixed over time. This ensures users are never confused after updates and can easily track the evolution of the game.

                            <br /><br />Since this project is developed by a very small team (primarily a solo developer with occasional AI assistance), the changelog also serves as a transparent development log that shows continuous progress, even when updates are incremental or behind-the-scenes.</span></li>
                        <li><span>We added Tips and FAQ pages to help players learn Sudoku more easily and
                            improve their skills over time. The FAQ explains the basics, while the
                            Tips section shares useful strategies to help players solve puzzles more confidently.

                            <br /><br />Since this is a small indie project (mostly built by one developer with AI help),
                            these pages also help make the experience clearer and more beginner-friendly for everyone.</span></li>
                    </ul>
                </div>
            </main>
        </Layout >
    );
}

export default ChangeLog;
