import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { SmallUiWidgets } from "../components/SmallUiWidgets";
import { getLatestKnownIssues } from '@/components/SmallUiWidgets.tsx';

const { ChangelogEntry } = SmallUiWidgets;
const { Timeline } = SmallUiWidgets;
const { KnownIssuesBox } = SmallUiWidgets;
const issues = getLatestKnownIssues();

function ChangeLog({ }) {
    return (<>
        <title>"What's New?" | Sudoku </title>
        <meta name="description" content="It's the change log" />
        <Layout>
            <main className="w-full max-w-4xl mx-auto px-6 py-24 text-left flex-1">
                {/* Title */}
                <h1 className="text-3xl font-bold text-center mb-12 dark:text-white">
                    What's New?
                </h1>
                <KnownIssuesBox
                    items={issues} />
                <Timeline>
                    <ChangelogEntry
                        date="2026-04-28"
                        version="1.0.0"
                        title="Improvements & Features"
                        items={[
                            <>Added auto-pause when player didn't do anything for 2 minutes or away from the tab. </>,
                            <>Added Game Pause popup once player pauses the timer/game.</>,
                            <>
                                Added score history widget, which refreshes every 24 hours.
                            </>,
                            <>
                                Adjusted score widget UI due to new history widgeton mobile portrait screens.
                            </>,
                            <>
                                Changed scoring calculation for hard and expert difficulties, and adjusted the timer penalty multiplier.</>
                        ]}
                    />
                    <ChangelogEntry
                        date="2026-04-22"
                        version="1.0.0"
                        title="Improvements & Features"
                        items={[
                            <>Updated <a href="https://sudokuplays.com/ChangeLog">What's New?</a> page</>,
                            <>Updated the Terms & Conditions.</>,
                            <>Changed the color of timer controll button for dark theme.</>,
                            <>Updated instructions modal for better understanding of the game.</>,
                        ]}
                    />
                    <ChangelogEntry
                        date="2026-04-21"
                        version="1.0.0"
                        title="Improvements &Bug Fixes"
                        items={[
                            <>Disabled landscape rotation on iPhones (iPads unaffected).</>,
                            <>Improved UI compatibility for newer iPhones in portrait mode.</>,
                            <>Found and fixed the bug that the score is not reset while reseting the current game.</>,
                            <>
                                Fixed the UI bug on old and new iPhone models, especially with known issues box.
                            </>
                        ]}
                    />
                    <ChangelogEntry
                        date="2026-04-20"
                        version="1.0.0"
                        title="Improvements & Features"
                        items={[
                            <>
                                <b>Juicy UI / Success Feedback: </b><br />
                                Added a Validation Ripple Effect animations at completetion of a domain.
                            </>,
                            <><b>Validated Domain Anchoring & Interactive Immutability: </b><br />

                                Once completed, the values are "anchored" (fixed) so the player can't accidentally
                                break what they’ve already solved, but the cell isn't "dead" or "disabled." It still participates in
                                the Cross-Highlighting or Selection State so the player can use it as a reference for the rest of the board.</>

                        ]}
                    />
                    <ChangelogEntry
                        date="2026-04-16"
                        version="1.0.0"
                        title="Improvements & Bug Fixes"
                        items={[
                            <>Fixed the bug in the remaining-number counter:
                                <br />incorrect inputs were being counted as valid entries, which caused the remaining counts for digits 1–9 to be miscalculated during gameplay.</>,
                            <>
                                Revised the final score calculation to deduct the product of total time used and the difficulty multiplier from the base score.
                            </>,
                            <>
                                Updated Privacy Policy for regional compliance.
                            </>

                        ]}
                    />
                    <ChangelogEntry
                        date="2026-04-14"
                        version="1.0.0"
                        title="Improvements & New Features"
                        items={[
                            <>Improved Contact page by replacing the old design with a working emil contact form,
                                enabling users to send messages directly to the site owner via EmailJS integration.
                            </>,
                        ]
                        } />
                    <ChangelogEntry
                        date="2026-04-13"
                        version="1.0.0"
                        title="Bug Fixes"
                        items={[
                            <>Fixed the issue regarding game timer that
                                does not reset in case of starting new game,
                                reset current game, or changing difficulty.
                            </>,
                            <>Fixed the React 404 problem during hard refresh.</>,
                        ]}
                    />
                    <ChangelogEntry
                        date="2026-04-11"
                        version="1.0.0"
                        title="Improvements & Features"
                        items={[
                            <> Added a play/pause button for the countdown timer, allowing players to pause and resume gameplay anytime for a more relaxed and enjoyable experience.
                                To try the new feature, go to homepage by clicking <Link to="/" className="underline hover:text-blue-500">here</Link>.
                            </>,
                            <> Added a <Link to="/changeLog" className="underline hover:text-blue-500">What's New?</Link> page that displays version updates and changelogs to help players clearly understand what has been added, improved, or fixed over time. This ensures users are never confused after updates and can easily track the evolution of the game.

                                <br /><br />

                                Since this project is developed by a very small team (primarily a solo developer with occasional AI assistance), the changelog also serves as a transparent development log that shows continuous progress, even when updates are incremental or behind-the-scenes.
                            </>,
                            <>Added <Link to="/sudokuTips" className="underline hover:text-blue-500">Tips</Link> and <Link to="/sudokuTips" className="underline hover:text-blue-500">FAQ</Link> pages to help players learn Sudoku more easily and improve their skills over time. The FAQ explains the basics, while the Tips section shares useful strategies to help players solve puzzles more confidently.                        </>
                        ]}
                    />
                </Timeline >
            </main>
        </Layout>
    </>);
}
export default ChangeLog;