import Layout from '@/components/Layout';
import ShareBoxes from '@/components/ShareBoxes';
import { ThemeProvider } from '@/components/ThemeContext';
import { useState } from "react";

const sections = [
    {
        id: "objective",
        number: "01",
        title: "The Objective",
        icon: "⊞",
        content: null,
    },
    {
        id: "difficulties",
        number: "02",
        title: "Game Difficulties",
        icon: "⭐",
        content: null,
    },
    {
        id: "controls",
        number: "03",
        title: "Controls & Interaction",
        icon: "⌨",
        content: null,
    },

    {
        id: "tools",
        number: "04",
        title: "Tools & Actions",
        icon: "✎",
        content: null,
    },
    {
        id: "numpad",
        number: "05",
        title: "Number Pad",
        icon: "#",
        content: null,
    },
    {
        id: "keyboard",
        number: "06",
        title: "Keyboard Navigation",
        icon: "↵",
        content: null,
    },
    {
        id: "scoring",
        number: "07",
        title: "Scoring System",
        icon: "★",
        content: null,
    },
    {
        id: "winslose",
        number: "08",
        title: "Winning & Losing",
        icon: "⚑",
        content: null,
    },
];

function Tag({ children, color = "blue" }: { children: React.ReactNode; color?: "blue" | "yellow" | "white" | "red" | "gray" | "black" | "green" }) {
    const colors = {
        blue: "#2c89ccff",
        yellow: "#eab308",
        red: "#ef4444",
        gray: "#94a3b8",
        white: "#ffffff",
        black: "#000000",
        green: "bg-[rgba(34,197,94,0.12)] text-green-600 dark:text-[#4ade80] border-[rgba(34,197,94,0.25)]",

    }
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-lg sm:rounded-sm md:rounded-md xs:text-xs 
        sm:text-sm md:text-md font-medium border ${colors[color]}`}>
            {children}
        </span>
    );
}
function RuleCard({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
    return (
        <div className="group rounded-xl border dark:border-[#2d3748] dark:bg-[#161b22] p-5 dark:hover:border-[#3b82f6] transition-all duration-200  dark:hover:bg-[rgba(59,130,246,0.04)]">
            <div className="flex items-start gap-3">
                <div className="shrink-0 w-8 h-8 rounded-lg dark:bg-[rgba(59,130,246,0.12)] flex items-center justify-center dark:text-[#60a5fa] text-sm font-bold">
                    {icon}
                </div>
                <div>
                    <p className="font-semibold dark:text-[#e2e8f0] text-sm mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>{title}</p>
                    <p className="dark:text-[#8b97a8] text-sm leading-relaxed">{children}</p>
                </div>
            </div>
        </div>
    );
}

function KeyCap({ children }: { children: React.ReactNode }) {
    return (
        <kbd className="inline-flex items-center justify-center px-2 py-1 
        rounded bg-gray-700 dark:bg-[#1e2530] border border-[#2d3748] text-[#e2e8f0] text-xs min-w-[28px] shadow-[inset_0_-2px_0_rgba(0,0,0,0.4)]">
            {children}
        </kbd>
    );
}

function SectionAnchor({ id }: { id: string }) {
    return <span id={id} style={{ scrollMarginTop: 80 }} />;
}

function ScoreRow({ label, value, color }: { label: string; value: string; color: string }) {
    return (
        <div className="flex items-center justify-between py-2.5 border-b border-[#2d3748] last:border-0">
            <span className="dark:text-[#8b97a8] sm:text-sm md:text-md">{label}</span>
            <span className={`sm:text-sm md:text-md font-semibold ${color}`}>{value}</span>
        </div>
    );
}

function DetailedGuide() {
    const [, setActiveSection] = useState("objective");

    return (
        <ThemeProvider>
            <Layout>
                <main className="sudoku-app" style={{ width: '100%', padding: '6rem 2rem 6rem', maxWidth: '900px', textAlign: 'left', flex: '1 0 auto' }}>                    {/* Hero */}
                    <div className="mb-14 grid lg:grid-cols-[1fr_auto] gap-10 items-center">
                        <div>
                            {/* <div className="flex items-center gap-2 mb-4">
                                <Tag color="blue">How to play</Tag>
                                <Tag color="white">v1.0.0</Tag>
                            </div> */}
                            <h1
                                className="text-gray-600 dark:text-gray-200 text-2xl md:text-3xl sm:text-2xl lg:text-4xl font-bold text-center leading-[1.1]"
                                style={{ fontFamily: "Outfit, sans-serif", color: "" }}
                            >
                                <span className=''> How SudokuPlays Works? </span>

                            </h1>
                            <p className="text-center max-w-3xl items-center w-full dark:text-[#8b97a8] text-gray-600 md:text-md xl:text-xl sx:text-sx sm:text-sm 
                            lg:text-lg mx-auto leading-relaxed mb-6 mt-6 sx:mb-4">
                                This guide walks you through everything you need to know to play Sudoku on SudokuPlays, from choosing a difficulty
                                and using the controls to understanding scoring and finishing a puzzle.
                            </p>

                            {/* Navigation to sections*/}
                            <div className="flex grid grid-rows-2 grid-flow-col max-w-3xl flex-wrap gap-3 
                            items-center justify-center">
                                {sections.map((s) => (
                                    <a
                                        key={s.id}
                                        href={`#${s.id}`}
                                        onClick={() => setActiveSection(s.id)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 md:rounded-md sm:rounded-sm rounded-lg 
                                        border-[1px] border-[#2980b9] dark:border-[#2d3748] dark:bg-[#161b22] text-red-800 dark:text-[#8b97a8] 
                                        sm:text-sm md:text-md xs:text-xs hover:boder-blue-300 hover:bg-[#f9f9f9]
                                        dark:hover:border-[#3b82f6] hover:border-[border-color] dark:hover:text-[#60a5fa] transition-all"
                                    >
                                        <span className="text-sm text-[#2980b9] dark:text-gray-400">{s.number}</span>
                                        <span className='text-sm text-[#2980b9] dark:text-gray-400'>{s.title}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Section 01: Objective */}
                    <section className="mb-12">
                        <SectionAnchor id="objective" />
                        <div className="flex items-center gap-3 mb-6">
                            <span className="xs:text-xs md:text-md lg:text-lg text-sm dark:text-[#4a5568]">01</span>
                            <div className="h-px flex-1 bg-gray-600 dark:bg-[#2d3748]" />
                            <h2 className="text-xl lg:text-lg md:text-md sm:text-sm font-bold text-gray-600 dark:text-[#e2e8f0]" style={{ fontFamily: "Outfit, sans-serif" }}>The Objective</h2>
                            <div className="h-px flex-1 bg-gray-600 dark:bg-[#2d3748]" />
                        </div>

                        <p className="text-center dark:text-[#8b97a8] justify-center flexitems-center text-gray-600 md:text-md xl:text-xl sx:text-sx sm:text-sm 
                            lg:text-lg max-w-lg mx-auto leading-relaxed mb-6 mt-6 sx:mb-4">
                            Fill every row, column, and 3×3 box with the digits 1 to 9. No repeats. Simple rules — deep strategy.
                        </p>

                        <div className="grid sm:grid-cols-3 gap-4 mb-6">
                            {[
                                { label: "Rows", desc: "Each horizontal row must contain 1–9, no repeats.", icon: "→" },
                                { label: "Columns", desc: "Each vertical column must contain 1–9, no repeats.", icon: "↓" },
                                { label: "3×3 Boxes", desc: "Each 3×3 square must contain 1–9, no repeats.", icon: "⊞" },
                            ].map((item) => (
                                <div key={item.label} className="rounded-xl border dark:border-[#2d3748] dark:bg-[#161b22] p-5 text-center">
                                    <div className="text-2xl mb-2 dark:text-[#3b82f6]">{item.icon}</div>
                                    <p className="font-bold dark:text-[#e2e8f0] mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>{item.label}</p>
                                    <p className="text-gray-500 dark:text-[#8b97a8] text-sm md:text-md xs:text-xs">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-xl border border-yellow-300 dark:border-[rgba(245,158,11,0.3)] bg-yellow-100 dark:bg-[rgba(245,158,11,0.06)] p-4 flex gap-3">
                            <span className="dark:text-[#f59e0b] text-lg shrink-0">💡</span>
                            <p className="text-sm text-[#cbd5e0]">
                                <strong className="text-yellow-600 dark:text-[#fbbf24]">Key rule: </strong>
                                <span className='text-gray-500 dark:text-gray-300'>A digit cannot appear more than once in any row, column, or 3×3 box. Use elimination to narrow down which numbers can go where.
                                </span>
                            </p>
                        </div>
                    </section>

                    {/* Section 2: Game Difficulties */}
                    <section className='mb-12'>
                        <SectionAnchor id="difficulties" />
                        <div className="flex items-center gap-3 mb-6">
                            <span className="sm:text-sm xs:text-xs lg:text-lg md:text-md text-gray-600 dark:text-[#4a5568]">02</span>
                            <div className="h-px flex-1 bg-gray-600 dark:bg-[#2d3748]" />
                            <h2 className="text-xl font-bold text-gray-600 dark:text-[#e2e8f0]" style={{ fontFamily: "Outfit, sans-serif" }}>Game Difficulties</h2>
                            <div className="h-px flex-1 bg-gray-600 dark:bg-[#2d3748]" />
                        </div>
                        <span className='text-center px-4 py-2 mb-6 flex flex-wrap items-center justify-center gap-1 text-gray-700 dark:text-gray-300'>
                            In the top-right navigation menu on the
                            <a href="/">homepage (game page)</a>,
                            click or tap on the
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                className="theme-icon-img" aria-labelledby='svg-title svg-description'>
                                <title className='sr-only' id='svg-title'>Change difficulty icon</title>
                                <desc id='svg-description'>Clickable icon button for difficulty change</desc>
                                <path d="M11.9999 3C10.0221 3.00003 8.0887 3.58653 6.44424 4.68535C4.79977 5.78416 3.51807 7.34594 2.7612 9.17318C2.00434 11.0004 1.8063 13.0111 2.19214 14.9509C2.57799 16.8907 3.53037 18.6725 4.92887 20.071L5.63587 20.778L8.05687 18.357L6.64287 16.943L5.67987 17.905C4.80055 16.7718 4.24206 15.4231 4.06287 14H5.99987V12H4.06287C4.24206 10.5769 4.80055 9.22817 5.67987 8.095L6.29287 8.707L6.79287 9.207L8.20687 7.793L7.09487 6.68C8.22804 5.80068 9.57678 5.24219 10.9999 5.063V6.5H12.9999V5.063C14.423 5.24219 15.7717 5.80068 16.9049 6.68L15.7929 7.793L17.2069 9.207L18.3199 8.095C19.1992 9.22817 19.7577 10.5769 19.9369 12H17.9999V14H19.9369C19.7576 15.4235 19.1987 16.7727 18.3189 17.906L17.3569 16.943L15.9429 18.357L18.3639 20.778L19.0709 20.071C20.4689 18.6723 21.4208 16.8905 21.8064 14.9509C22.192 13.0112 21.9938 11.0008 21.237 9.1738C20.4803 7.34675 19.1988 5.78508 17.5546 4.68619C15.9105 3.58729 13.9774 3.0005 11.9999 3Z" fill="currentColor" />
                                <path d="M12.7066 13.7064C12.8888 13.5178 12.9895 13.2652 12.9873 13.003C12.985 12.7408 12.8798 12.49 12.6944 12.3046C12.509 12.1192 12.2582 12.014 11.996 12.0118C11.7338 12.0095 11.4812 12.1103 11.2926 12.2924L8.29259 15.2924C8.19708 15.3847 8.1209 15.495 8.06849 15.617C8.01608 15.739 7.9885 15.8703 7.98734 16.003C7.98619 16.1358 8.01149 16.2675 8.06177 16.3904C8.11205 16.5133 8.18631 16.6249 8.2802 16.7188C8.37409 16.8127 8.48574 16.887 8.60864 16.9373C8.73154 16.9875 8.86321 17.0128 8.99599 17.0117C9.12877 17.0105 9.25999 16.9829 9.382 16.9305C9.504 16.8781 9.61435 16.8019 9.70659 16.7064L12.7066 13.7064Z" fill="currentColor" />
                            </svg> icon to change the game difficulty.
                        </span>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <RuleCard icon="🌱" title="Very Easy">
                                This introductory level is designed for beginners to practice foundational Sudoku logic and skills.
                            </RuleCard>
                            <RuleCard icon="🎵" title="Easy">
                                A gentle step up for casual players. Focuses on straightforward row and column scanning without the need for complex strategies.
                            </RuleCard>
                            <RuleCard icon="😗" title="Medium">
                                It's the default level. A balanced challenge for intermediate players. Requires deeper deduction, cross-referencing, and spotting simple patterns like hidden singles to progress.                            </RuleCard>
                            <RuleCard icon="🤔" title="Hard">
                                Designed for experienced puzzle solvers. You will need to rely on advanced solving techniques, forward-thinking, and multi-step logic to complete the grid.                            </RuleCard>
                            <RuleCard icon="🧐" title="Expert">
                                The ultimate test for Sudoku masters. Features minimal starting numbers and demands complex, expert-level strategies to crack the puzzle.                            </RuleCard>
                            <RuleCard icon="🥊" title="Leaderboard Tier">
                                Available in Medium, Hard, and Expert. Your chosen difficulty scales your final score, with higher levels yielding greater leaderboard rewards.
                            </RuleCard>
                        </div>
                    </section>

                    {/* Section 02: Controls */}
                    <section className="mb-12">
                        <SectionAnchor id="controls" />
                        <div className="flex items-center gap-3 mb-6">
                            <span className="sm:text-sm text-xs lg:text-lg md:text-md dark:text-[#4a5568]">03</span>
                            <div className="h-px flex-1 bg-gray-600  dark:bg-[#2d3748]" />
                            <h2 className="text-xl font-bold dark:text-[#e2e8f0]" style={{ fontFamily: "Outfit, sans-serif" }}>Controls & Interaction</h2>
                            <div className="h-px flex-1 bg-gray-600 dark:bg-[#2d3748]" />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <RuleCard icon="⊡" title="Selecting a Cell">
                                Click or tap any cell to select it. The game highlights the full row, column, and 3×3 box to show which numbers are already placed.
                            </RuleCard>
                            <RuleCard icon="◎" title="Match Tracking">
                                Tap any digit — including pre-filled cells — to instantly highlight every matching number on the board. Useful for spotting where a digit still needs to go.
                            </RuleCard>
                            <RuleCard icon="✎" title="Placing a Number">
                                With an empty cell selected, type 1–9 via your keyboard, the on-screen number pad, or mobile buttons. You can overwrite a wrong entry at any time with a new digit.
                            </RuleCard>
                            <div className="rounded-xl border border-[rgba(239,68,68,0.25)] bg-[rgba(239,68,68,0.05)] p-5">
                                <div className="flex items-start gap-3">
                                    <div className="shrink-0 w-8 h-8 rounded-lg bg-[rgba(239,68,68,0.12)] flex items-center justify-center text-[#f87171] text-sm font-bold">!</div>
                                    <div>
                                        <p className="font-semibold dark:text-[#e2e8f0] sm:text-sm mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>Completed Domains</p>
                                        <p className="text-gray-500 dark:text-[#8b97a8] sm:text-sm xs:text-xs md:text-md leading-relaxed">
                                            Once a row, column, or 3×3 box is fully completed, those cells are locked — you can select them but cannot place a new number.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 03: Tools */}
                    <section className="mb-12">
                        <SectionAnchor id="tools" />
                        <div className="flex items-center gap-3 mb-6">
                            <span className="sm:text-sm xs:text-xs lg:text-lg md:text-md text-gray-600 dark:text-[#4a5568]">04</span>
                            <div className="h-px flex-1 bg-gray-600 dark:bg-[#2d3748]" />
                            <h2 className="text-xl font-bold text-gray-600 dark:text-[#e2e8f0]" style={{ fontFamily: "Outfit, sans-serif" }}>Tools & Actions</h2>
                            <div className="h-px flex-1 bg-gray-600 dark:bg-[#2d3748]" />
                        </div>

                        <div className="grid gap-4">
                            {[
                                {
                                    label: "Pencil Mode",
                                    tag: <Tag color="blue">Toggle</Tag>,
                                    icon: "✏️",
                                    desc: "Activate Pencil Mode to jot candidate numbers inside a cell when you're not yet certain of the answer. Great for tracking possibilities without committing.",
                                },
                                {
                                    label: "Eraser",
                                    tag: <Tag color="yellow">Action</Tag>,
                                    icon: "⌫",
                                    desc: "Removes an incorrect digit or clears pencil notes from the selected cell. Note: the eraser has no effect on locked cells in a completed domain.",
                                },
                                {
                                    label: "Hints",
                                    tag: <Tag color="green">Up to 3 per game</Tag>,
                                    icon: "💡",
                                    desc: "Stuck? Use a hint to reveal the correct number for a tricky cell. Hints automatically clear any wrong input or pencil notes in that cell. Run out? Earn extras by watching a short ad.",
                                },
                                {
                                    label: "Reset",
                                    tag: <Tag color="red">Destructive</Tag>,
                                    icon: "🔄️",
                                    desc: "Resets the entire board to its original state — clears all your inputs, pencil notes, and hint count. Use with care.",
                                },
                            ].map((tool) => (
                                <div key={tool.label} className="flex gap-4 rounded-xl border border-[#2d3748] dark:bg-[#161b22] p-5 hover:border-[#2d3748] transition-colors">
                                    <div className="shrink-0 w-10 h-10 rounded-xl bg-[#2c89ccff] dark:bg-[#1e2530] 
                                    flex items-center justify-center text-xl text-white dark:text-[#e2e8f0]">
                                        {tool.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className="font-bold dark:text-[#e2e8f0]" style={{ fontFamily: "Outfit, sans-serif" }}>{tool.label}</span>
                                            {tool.tag}
                                        </div>
                                        <p className="dark:text-[#8b97a8] text-sm md:text-md leading-relaxed">{tool.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 04 & 05: Number Pad & Keyboard side-by-side */}
                    <div className="grid lg:grid-cols-2 gap-6 mb-12">
                        {/* Number Pad */}
                        <section>
                            <SectionAnchor id="numpad" />
                            <div className="flex items-center gap-3 mb-5">
                                <span className="sm:text-sm lg:text-lg xl:text-xl md:text-md xs:text-xs dark:text-[#4a5568]">05</span>
                                <div className="h-px flex-1 bg-gray-600 dark:bg-[#2d3748]" />
                                <h2 className="text-lg font-bold text-gray-600 dark:text-[#e2e8f0]" style={{ fontFamily: "Outfit, sans-serif" }}>Number Pad</h2>
                            </div>
                            <div className="rounded-lg md:rounded-md sm:rounded-sm xl:rounded-xl 
                            border dark:border-[#2d3748] dark:bg-[#161b22] p-5">
                                {/* Mini numpad visual */}
                                <div className="grid grid-cols-5 gap-2 mb-5">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                                        <div
                                            key={n}
                                            className="relative xl:rounded-xl sm:rounded-sm md:rounded-md rounded-lg
                                             flex items-center justify-center font-semibold lg:text-lg md:text-md sm:text-sm aspect-square"
                                            style={{
                                                /* Number pad buttons in how sudokuplays works*/
                                                background: "#3498db",
                                                color: "#fff",
                                                fontFamily: "Outfit, sans-serif",
                                                boxShadow: "0 1px 8px rgba(44, 82, 162, 0.3)",
                                            }}
                                        >
                                            {n}
                                            <span
                                                className="absolute bottom-0.5 right-1 sm:text-sm md:text-md xs:text-xs opacity-80"
                                                style={{ fontFamily: "Outfit, sans-serif" }}
                                            >
                                                {9 - Math.floor(n / 3)}
                                            </span>
                                        </div>
                                    ))}
                                    <div
                                        className="sm:rounded-sm md:rounded-md xs:rouonded-xs rounded-lg dark:text-[#8b97a8]
                                         border dark:border-[#2d3748] dark:bg-[#1e2530] flex items-center justify-center
                                         sm:text-sm md:text-md lg:text-lg xs:text-xs aspect-square"
                                    >
                                        ⌫
                                    </div>
                                </div>
                                <ul className="space-y-2 sm:text-sm lg:text-lg xl:text-xl md:text-md dark:text-[#8b97a8]">
                                    <li className="flex gap-2"><span className="text-[#3b82f6]">●</span> Blue buttons input digits 1–9.</li>
                                    <li className="flex gap-2"><span className="text-[#3b82f6]">●</span> The small number in the bottom-right corner shows how many of that digit remain to be placed.</li>
                                    <li className="flex gap-2"><span className="text-[#3b82f6]">●</span> On portrait mobile, remaining counts appear below each button.</li>
                                    <li className="flex gap-2"><span className="text-[#f87171]">●</span> The pad is inactive for locked cells in completed domains.</li>
                                </ul>
                            </div>
                        </section>

                        {/* Keyboard */}
                        <section>
                            <SectionAnchor id="keyboard" />
                            <div className="flex items-center gap-3 mb-5">
                                <span className="text-xs sm:text-sm md:text-md lg:text-lg text-gray-600 dark:text-[#4a5568]">06</span>
                                <div className="h-px flex-1 bg-gray-600 dark:bg-[#2d3748]" />
                                <h2 className="md:text-md sm:text-sm xs:text-xs lg:text-lg font-bold dark:text-[#e2e8f0]" style={{ fontFamily: "Outfit, sans-serif" }}>Keyboard Navigation</h2>
                            </div>
                            <div className="md:rounded-md sm:rounded-sm rounded-lg xl:rounded-xl border dark:border-[#2d3748] dark:bg-[#161b22] p-5 h-[calc(100%-52px)]">
                                <div className="space-y-3 mb-5">
                                    <div className="flex items-center justify-between">
                                        <span className="dark:text-[#8b97a8] md:text-md lg:text-lg sm:text-sm">Move between cells</span>
                                        <div className="flex gap-1">
                                            {["↑", "↓", "←", "→"].map((k) => <KeyCap key={k}>{k}</KeyCap>)}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="dark:text-[#8b97a8] md:text-md lg:text-lg text-sm">Input a digit</span>
                                        <div className="flex gap-1">
                                            <KeyCap>1</KeyCap>
                                            <span className="dark:text-[#4a5568] sm:text-sm text-xs self-center">—</span>
                                            <KeyCap>9</KeyCap>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="dark:text-[#8b97a8] md:text-md lg:text-lg text-sm text-sm">Delete input</span>
                                        <div className="flex gap-1">
                                            <KeyCap>⌫</KeyCap>
                                            <KeyCap>Del</KeyCap>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:rounded-md sm:rounded-sm rounded-lg xl:rounded-xl bg-[#f8f9fa]
                                 dark:bg-[#0d1117] border dark:border-[#2d3748] p-3">
                                    <p className="text-xs dark:text-[#4a5568] uppercase tracking-wider mb-2">Note</p>
                                    <p className="text-sm darK:text-[#8b97a8]">
                                        Keyboard input is blocked on locked cells in a completed domain — the arrow keys still navigate, but digit keys have no effect.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Section 06: Scoring */}
                    <section className="mb-12">
                        <SectionAnchor id="scoring" />
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-xs sm:text-sm md:text-md lg:text-lg text-gray-600 dark:text-[#4a5568]">07</span>
                            <div className="h-px flex-1 bg-gray-600 dark:bg-[#2d3748]" />
                            <h2 className="text-xl font-bold dark:text-[#e2e8f0]" style={{ fontFamily: "Outfit, sans-serif" }}>Scoring System</h2>
                            <div className="h-px flex-1 bg-gray-600 dark:bg-[#2d3748]" />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="rounded-xl border border-[#2d3748] dark:bg-[#161b22] p-5">
                                <p className="font-bold dark:text-[#e2e8f0] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>How Points Work</p>
                                <ScoreRow label="Correct number placed" value="+Bonus pts" color="text-[#4ade80]" />
                                <ScoreRow label="Difficulty multiplier" value="×Higher" color="text-[#60a5fa]" />
                                <ScoreRow label="Each mistake" value="−Points" color="text-[#f87171]" />
                                <ScoreRow label="Excess time" value="−Points" color="text-[#f87171]" />
                                <ScoreRow label="10 mistakes" value="Game over" color="text-[#f87171]" />
                                <div className="mt-4 pt-4 border-t border-[#2d3748] flex items-center justify-between">
                                    <span className="dark:text-[#8b97a8] sm:text-sm text-md lg:text-lg">Score resets</span>
                                    <Tag color="yellow">Every 24 hours</Tag>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="rounded-xl border border-[rgba(59,130,246,0.3)] bg-[rgba(59,130,246,0.05)] p-5">
                                    <p className="text-xs font-mono text-[#4a5568] uppercase tracking-wider mb-2">Score Display</p>
                                    <div
                                        className="text-3xl font-bold font-mono mb-1"
                                        style={{ color: "#3b82f6", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.15em" }}
                                    >
                                        - - - -
                                    </div>
                                    <p className="text-sm text-[#8b97a8]">Dashes show until you place your first number. Score is calculated in real time and finalised when the game ends.</p>
                                </div>
                                <div className="rounded-xl border border-[#2d3748] dark:bg-[#161b22] p-5">
                                    <p className="md:text-md xs:text-xs text-sm dark:text-[#4a5568] uppercase tracking-wider mb-2">Pro Tip</p>
                                    <p className="text-sm xs:text-xs md:text-md dark:text-[#8b97a8]">
                                        Higher difficulty modes offer a larger score multiplier — a clean Hard or Expert solve scores significantly more than the same time on Easy.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 07: Winning & Losing */}
                    <section className="mb-12">
                        <SectionAnchor id="winslose" />
                        <div className="flex items-center gap-3 mb-6">
                            <span className="sm:text-sm md:text-md xs:text-xs lg:text-lg dark:text-[#4a5568]">08</span>
                            <div className="h-px flex-1 bg-gray-600 dark:bg-[#2d3748]" />
                            <h2 className="text-xl font-bold dark:text-[#e2e8f0]" style={{ fontFamily: "Outfit, sans-serif" }}>Winning & Losing</h2>
                            <div className="h-px flex-1 bg-gray-600 dark:bg-[#2d3748]" />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                            <div className="rounded-xl border border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.05)] p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-[rgba(34,197,94,0.15)] flex items-center justify-center dark:text-[#22c55e] lg:text-lg xl:text-xl">✓</div>
                                    <h3 className="font-bold dark:text-[#e2e8f0] lg:text-lg xl:text-xl" style={{ fontFamily: "Outfit, sans-serif" }}>You Win</h3>
                                </div>
                                <p className="dark:text-[#8b97a8] text-sm leading-relaxed">
                                    All empty cells are filled and <strong className="text-[#4ade80]">no red numbers</strong> are showing. Every row, column, and box is correctly solved.
                                </p>
                            </div>
                            <div className="rounded-xl border border-[rgba(239,68,68,0.3)] bg-[rgba(239,68,68,0.05)] p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-[rgba(239,68,68,0.15)] flex items-center justify-center text-[#ef4444] text-xl">✗</div>
                                    <h3 className="font-bold dark:text-[#e2e8f0] lg:text-lg xl:text-xl" style={{ fontFamily: "Outfit, sans-serif" }}>You Lose</h3>
                                </div>
                                <p className="text-gray-500 dark:text-[#8b97a8] sm:text-sm text-md leading-relaxed">
                                    Accumulate <strong className="text-[#f87171]">10 mistakes</strong> and the game ends immediately. Incorrect inputs are shown in red — fix them before they add up.
                                </p>
                            </div>
                        </div>

                        {/* Mistake tracker visual */}
                        <div className="mt-5 xl:rounded-xl rounded-lg md:rounded-md sm:rounded-sm border border-[#2d3748] bg-[#] dark:bg-[#161b22] p-5">
                            <div className="flex items-center justify-between mb-3">
                                <span className="sm:text-sm md:text-md lg:text-lg dark:text-[#8b97a8]">Mistake counter</span>
                                <Tag color="red">3 / 10</Tag>
                            </div>
                            <div className="flex gap-1.5">
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 h-2 rounded-full"
                                        style={{
                                            background: i < 3 ? "#ef4444" : "#1e2530",
                                            border: "1px solid",
                                            borderColor: i < 3 ? "#ef4444" : "#2d3748",
                                        }}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between mt-1.5">
                                <span className="text-sm dark:text-[#4a5568]">0</span>
                                <span className="text-sm text-red-500">10 = Game over</span>
                            </div>
                        </div>
                    </section>

                    <div className='p-1 mx-auto w-fit'>
                        <ShareBoxes score={0} difficulty={''} timeUsed={''} isGameCompleted={false} />
                    </div>
                    <div className="" style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <a href="/" className="new-game-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
                            Back to Game
                        </a>
                    </div>
                </main>

            </Layout>
        </ThemeProvider>);
}
export default DetailedGuide;