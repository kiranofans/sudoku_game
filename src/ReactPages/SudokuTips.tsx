import { useEffect, useRef, useState } from 'react';
import Layout from '@/components/Layout';
import { ThemeProvider } from '@/components/ThemeContext';
import OutlinedCard, { SectionHeader } from '@/components/SmallUiWidgets';

// Define the type
// type TipItem = {
//     title: string;
//     description: string;
// };

const BEGINNER_TIPS = [
    {
        n: "01",
        title: "Scan Before You Write",
        body: "Before placing any number, spend 30 seconds scanning rows, columns, and boxes. You're building a mental map of what's already placed — and what's missing.",
        callout: "A quick scan at the start often reveals 3–5 cells you can solve immediately.",
    },
    {
        n: "02",
        title: "Eliminate, Don't Guess",
        body: "For each empty cell, note which digits already appear in its row, column, and 3×3 box. The digits that don't appear are its candidates. Work from what you know.",
        callout: "If a cell has exactly one candidate remaining, it's solved. Write it in.",
    },
    {
        n: "03",
        title: "Work the Constraints",
        body: "Digits that appear many times across the board create tighter constraints elsewhere. If 7 is in six rows, the remaining three rows are highly restricted — start there.",
        callout: "Heavily-placed digits reduce the search space dramatically. Use that.",
    },
];

const INTERMEDIATE_TIPS = [
    {
        n: "04",
        title: "Naked Singles",
        body: "When a cell's only remaining candidate is a single digit, fill it. Then immediately re-scan all adjacent cells — your new placement eliminates candidates from up to 20 neighboring cells.",
        badge: "Technique",
    },
    {
        n: "05",
        title: "Hidden Singles",
        body: "A digit is a hidden single when — despite a cell having multiple candidates — that digit can appear in only one cell within a unit (row, column, or box). The number has only one valid home.",
        badge: "Technique",
    },
    {
        n: "06",
        title: "Naked Pairs",
        body: "When two cells in the same unit share exactly the same two candidates (and no others), those digits are locked to those cells. Eliminate both candidates from every other cell in that unit.",
        badge: "Technique",
    },
];

const ADVANCED_TIPS = [
    {
        n: "07",
        title: "Pointing Pairs",
        body: "If a candidate in a 3×3 box is restricted to a single row or column, that digit must appear in one of those cells. Remove it as a candidate from all other cells in that row or column outside the box.",
        badge: "Advanced",
    },
    {
        n: "08",
        title: "Box/Line Reduction",
        body: "The inverse: if a candidate appears in only one box along a given row or column, it can't appear anywhere else in that box. Remove it from all other cells within the box.",
        badge: "Advanced",
    },
    {
        n: "09",
        title: "X-Wing",
        body: "When a candidate appears in exactly two cells in each of two rows, and those cells share the same two columns, the digit must land in one of those four corners. Remove it from both columns everywhere else.",
        badge: "Advanced",
    },
];

// Define the sections for the page nav
const PAGE_SECTIONS = [
    { id: 'solving-mindset', label: 'Solving Mindset' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' }
];

// Function that returns the Tips array
// const getTips = (): TipItem[] => {
//     return [
//         {
//             title: "Cross-Hatching",
//             description: "Cross-hatching is one of the most fundamental scanning techniques in Sudoku. To use it, pick a number from 1–9 and scan each 3×3 block to see where that number can legally go. Look at the rows and columns that already contain that number — they eliminate entire rows and columns from your candidate pool within the block. Wherever only one cell remains uneliminated in that block, place the number there. Repeat for every block on the board. This technique alone can solve many easy and medium puzzles without any other strategy."
//         },
//         {
//             title: "Naked Singles & Hidden Singles",
//             description: "A Naked Single occurs when a cell has only one possible candidate left after eliminating all numbers already used in its row, column, and 3×3 block. This is the simplest form of deduction — just place that one number.\n\nA Hidden Single is subtler. A cell may have several candidates, but one of those candidates appears in only one cell within a given row, column, or block. Even though other numbers could theoretically go there too, that specific number has nowhere else to go — making it a hidden but forced placement. Scanning for hidden singles significantly speeds up solving medium-difficulty puzzles."
//         },
//         {
//             title: "Naked Pairs",
//             description: "A Naked Pair occurs when exactly two cells in the same row, column, or 3×3 block each contain the same two candidates — and no other candidates. Since those two numbers must be placed in those two cells (in some order), you can safely eliminate both numbers from every other cell in that shared row, column, or block.\n\nFor example, if cells A and B both contain only {3, 7}, you know that 3 and 7 belong exclusively to those two cells. Any other cell in the same region that lists 3 or 7 as a candidate can have those candidates removed. This often unlocks placements elsewhere on the board."
//         },
//         {
//             title: "Pointing Pairs / Triples",
//             description: "Within a 3×3 block, if a specific candidate number is restricted to only two or three cells, and those cells all fall in the same row or column, that candidate can be eliminated from the rest of that row or column outside the block.\n\nFor example, if the number 5 can only appear in two cells within a block, and both of those cells are in row 4, then no other cell in row 4 (outside that block) can contain a 5. This is called a Pointing Pair. A Pointing Triple works the same way with three cells. This is a powerful technique for clearing candidates and is one of the first 'intermediate' strategies to learn."
//         },
//         {
//             title: "X-Wing",
//             description: "The X-Wing is an advanced elimination technique. First, find a candidate number that appears in exactly two cells in each of two separate rows — and crucially, those two cells in both rows share the exact same two columns. This forms a rectangle pattern on the grid.\n\nBecause the candidate must appear in one of the two positions in row A and one of the two positions in row B, the candidate is locked to those two columns across those rows. This means you can safely eliminate that candidate from every other cell in those two columns. The same logic applies if you start with columns instead of rows. X-Wing often unlocks a chain of deductions on harder puzzles."
//         },
//         {
//             title: "Swordfish",
//             description: "Swordfish is an extended version of X-Wing that involves three rows and three columns. Find a candidate number that appears in exactly two or three cells in each of three rows, and those appearances collectively span only three columns.\n\nBecause the candidate must be placed in exactly one cell per row, and all those possible placements are confined to three columns, the candidate can be eliminated from every other cell in those three columns. The pattern is harder to spot visually, but the logic is the same as X-Wing scaled up. Swordfish (and its 4-row equivalent, Jellyfish) are essential tools for cracking expert-level Sudoku puzzles without guessing."
//         }
//     ];
// };

function SudokuTips() {
    // const tips = getTips();
    const [activeSlug, setActiveSlug] = useState('solving-mindset');
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

    // Scroll-spy: track which section is currently in view
    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        const slugs = PAGE_SECTIONS.map(s => s.id);

        slugs.forEach((slug) => {
            const el = sectionRefs.current[slug];
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSlug(slug);
                    }
                },
                {
                    rootMargin: '-120px 0px -60% 0px',
                    threshold: 0,
                }
            );
            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach(o => o.disconnect());
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
        e.preventDefault();
        setActiveSlug(slug);
        const el = sectionRefs.current[slug];
        if (el) {
            const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-inner-height') || '50', 10);
            const navHeight = 50;
            const y = el.getBoundingClientRect().top + window.scrollY - headerHeight - navHeight - 12;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <ThemeProvider>
            <Layout>
                <main className="sudoku-app" style={{ width: '100%', padding: '6rem 2rem 6rem', maxWidth: '900px', textAlign: 'left', flex: '1 0 auto' }}>

                    <div className='mb-6'>
                        <h1 className="text-3xl font-bold text-center mt-6 mb-6 dark:text-white">
                            Tips & Strategies
                        </h1>
                        <p className='text-center'>From the right solving mindset to advanced elimination techniques — a structured guide for players at every level.</p>
                    </div>
                    {/* Sticky section nav */}
                    <nav className="sticky top-[var(--header-inner-height,48px)] sm:top-[(var(--header-inner-height,48px))] md:top-[var(--header-inner-height,48px)] sm:top-[var(--header-inner-height,48px)] z-[1000] w-full flex gap-6 sm:gap-8 border-y border-gray-200 
                    dark:border-gray-700 bg-white dark:bg-[rgba(30,41,59,0.85)] backdrop-blur-[12px] mb-8
                     [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{ WebkitOverflowScrolling: 'touch', WebkitBackdropFilter: 'blur(12px)' }}>
                        {PAGE_SECTIONS.map((section) => {
                            const slug = section.id;
                            return (
                                <a
                                    key={slug}
                                    href={`#${slug}`}
                                    className={`py-4 text-[0.85rem] md:text-md sm:text-sm whitespace-nowrap relative transition-colors text-gray-600 dark:text-gray-300
                                        duration-200 ease-[ease] after:content-[''] after:absolute after:bottom-[-1px] after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:bg-[var(--num-pad-bg)] 
                                        after:transition-[width] after:duration-300 after:ease-[ease] hover:text-gray-800 hover:font-bold dark:hover:text-gray-200 no-underline ${activeSlug === slug
                                            ? 'text-gray-900 dark:text-gray-100 font-bold after:w-full'
                                            : 'text-gray-500 dark:text-gray-400 after:w-0'
                                        }`}
                                    onClick={(e) => handleNavClick(e, slug)}
                                >
                                    {section.label}
                                </a>
                            );
                        })}
                    </nav>

                    <div className="w-full space-y-12 max-w-[800px] mx-auto">

                        {/* Section 1 */}
                        <section className="border border-gray-600 rounded-lg md:rounded-md sm:rounded-sm pt-4 p-2 py-3 px-3 bg-yellow-50 
                        dark:bg-gray-800" id="solving-mindset"
                            ref={(el) => { sectionRefs.current['solving-mindset'] = el; }} >
                            <h2 className="text-2xl font-bold mb-4 text-gray-600 dark:text-gray-300">Think Broadly, Not Quickly</h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                The most common mistake in Sudoku is fixating on one cell and forcing an answer.
                                The game rewards a wider lens.
                            </p>
                            <p className='text-gray-600 dark:text-gray-300 mt-4'>
                                Every cell lives at the intersection of three units — its row, its column, and its 3×3 box. A digit placed anywhere in those units constrains what can appear in your cell.
                            </p>
                            <div className="border-l-2 border-accent pl-[18px] mt-4">
                                <p className="font-sans text-[15px] italic leading-[1.65] text-on-panel/55 m-0">
                                    Stuck on a cell? Step away from it. Scan a different row,
                                    column, or box. New placements elsewhere often unblock the
                                    cell you left behind.
                                </p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section id="beginner" ref={(el) => { sectionRefs.current['beginner'] = el; }} className="pt-4">

                            <SectionHeader
                                label="Section 01 · Beginner"
                                heading="Building the Foundation"
                                subtext="Before techniques, before tricks — these three habits separate solvers who improve from those who plateau."
                            />
                            <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-3'>
                                {BEGINNER_TIPS.map((tip) => (
                                    <OutlinedCard
                                        key={tip.n}
                                        icon={tip.n}
                                        title={tip.title}
                                        bgColor='bg-orange-50'
                                    >
                                        {tip.body}
                                        <>{tip.callout}</>
                                    </OutlinedCard>
                                ))}
                            </div>
                        </section>

                        {/* Section 3 */}
                        <section id="intermediate" ref={(el) => { sectionRefs.current['intermediate'] = el; }} className="pt-4">
                            <SectionHeader
                                label="Section 02 · Intermediate"
                                heading="Named Techniques"
                                subtext="Once you can scan and eliminate reliably, these named patterns will let you solve any medium-difficulty puzzle without guessing."
                            />
                            <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-3'>
                                {INTERMEDIATE_TIPS.map((tip) => (
                                    <OutlinedCard
                                        key={tip.n}
                                        icon={tip.n}
                                        title={tip.title}
                                        bgColor='bg-green-50'
                                    >
                                        {tip.body}
                                    </OutlinedCard>
                                ))}
                            </div>
                            <div className="mt-2 border-yellow-300 dark:border-[rgba(245,158,11,0.3)] 
                            bg-yellow-100 dark:bg-[rgba(245,158,11,0.06)] 
                            py-5 px-7 border border-border rounded-lg md:rounded-md transition-colors
                             duration-250 dark:border-border-dark">
                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-[1.65] text-ink m-0">
                                    <strong className="font-semibold text-yellow-700 dark:text-yellow-400">A note on candidate marking:</strong>{" "}
                                    Intermediate techniques require tracking candidates — the possible
                                    digits for each empty cell. Use the in-game notes feature (pencil
                                    icon) to pencil in candidates before applying these patterns.
                                </p>
                            </div>
                        </section>

                        {/* Section 4 */}
                        <section id="advanced" ref={(el) => { sectionRefs.current['advanced'] = el; }} className="pt-4">
                            <SectionHeader
                                label="Section 03 · Advanced"
                                heading="Pattern Recognition"
                                subtext="These techniques require fully marked candidate grids and systematic pattern search. Master them and no expert puzzle will stop you."
                            />
                            <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-3'>
                                {ADVANCED_TIPS.map((tip) => (
                                    <OutlinedCard
                                        key={tip.n}
                                        icon={tip.n}
                                        title={tip.title}
                                        bgColor='bg-pink-50'
                                    >
                                        {tip.body}
                                    </OutlinedCard>
                                ))}
                            </div>
                        </section>

                    </div>

                    <div className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">

                        Still feeling lost? Check out our <a href="/detailedGuide">How SudokuPlays Works</a> guide for more help using the site and playing Sudoku.
                        <br />
                        For more deep explanations and other professional Sudoku strategies,
                        checkout
                        <a href="https://www.sudokuwiki.org/"> Sudoku Wiki</a>

                        <p className='mt-[1rem] text-sm'>Ready to put these strategies to the test?</p>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <a href="/" className="new-game-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
                            Play Sudoku
                        </a>
                    </div>
                </main>
            </Layout>
        </ThemeProvider >
    );
};

export default SudokuTips;
