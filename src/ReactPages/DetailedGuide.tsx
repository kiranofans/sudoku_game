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
        id: "controls",
        number: "02",
        title: "Controls & Interaction",
        icon: "⌨",
        content: null,
    },
    {
        id: "tools",
        number: "03",
        title: "Tools & Actions",
        icon: "✎",
        content: null,
    },
    {
        id: "numpad",
        number: "04",
        title: "Number Pad",
        icon: "#",
        content: null,
    },
    {
        id: "keyboard",
        number: "05",
        title: "Keyboard Navigation",
        icon: "↵",
        content: null,
    },
    {
        id: "scoring",
        number: "06",
        title: "Scoring System",
        icon: "★",
        content: null,
    },
    {
        id: "winslose",
        number: "07",
        title: "Winning & Losing",
        icon: "⚑",
        content: null,
    },
];
// const [board, setBoard] = useState<(number | null)[][]>([]);
// const [initialBoard, setInitialBoard] = useState<(number | null)[][]>([]);
// const [notes, setNotes] = useState<CellNotes[][]>([]);
// const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
// const [isLoading, setIsLoading] = useState(false);
// const highlightedNumber = selectedCell ? board[selectedCell[0]][selectedCell[1]] : null;

{/* Sudoku Mini Grid */ }
// function SudokuMiniGrid() {
//     const grid = [
//         [5, 3, 0, 0, 7, 0, 0, 0, 0],
//         [6, 0, 0, 1, 9, 5, 0, 0, 0],
//         [0, 9, 8, 0, 0, 0, 0, 6, 0],
//         [8, 0, 0, 0, 6, 0, 0, 0, 3],
//         [4, 0, 0, 8, 0, 3, 0, 0, 1],
//         [7, 0, 0, 0, 2, 0, 0, 0, 6],
//         [0, 6, 0, 0, 0, 0, 2, 8, 0],
//         [0, 0, 0, 4, 1, 9, 0, 0, 5],
//         [0, 0, 0, 0, 8, 0, 0, 7, 9],
//     ];
//     const [selected, setSelected] = useState<[number, number] | null>([1, 4]);

//     const isHighlighted = (r: number, c: number) => {
//         if (!selected) return false;
//         const [sr, sc] = selected;
//         return r === sr || c === sc || (Math.floor(r / 3) === Math.floor(sr / 3) && Math.floor(c / 3) === Math.floor(sc / 3));
//     };

//     const isSelected = (r: number, c: number) => selected && selected[0] === r && selected[1] === c;

//     return (
//         <div className="inline-grid gap-0" style={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: 0 }}>
//             {grid.map((row, r) =>
//                 row.map((val, c) => {
//                     const borderRight = (c + 1) % 3 === 0 && c !== 8 ? "2px solid #3b82f6" : "1px solid #2d3748";
//                     const borderBottom = (r + 1) % 3 === 0 && r !== 8 ? "2px solid #3b82f6" : "1px solid #2d3748";
//                     const bg = isSelected(r, c) // dark mode
//                         ? "bg-[#b8d3feff] dark:bg-[#3498db]"
//                         : isHighlighted(r, c)
//                             ? "bg-[#b8d3feff] dark:bg-[rgba(59,130,246,0.12)]"
//                             : "dark:bg-[#161b22]";

//                     return (
//                         <div
//                             key={`${r}-${c}`}
//                             onClick={() => setSelected([r, c])}
//                             className={`w-7 h-7 flex items-center justify-center font-['JetBrains_Mono',_monospace] text-[12px] sm:text-sm md:text-md 
//                                 xs:text-xs cursor-pointer transition-colors duration-[120ms]
//                                 ${c === 0 ? "border-l border-[#2d3748]" : ""}
//                                 ${r === 0 ? "border-t border-[#2d3748]" : ""}
//                                 ${val ? "font-semibold" : "font-normal"}
//                                 ${isSelected(r, c) ? "text-white" : val ? "text-gray-700 dark:text-gray-300" : "text-[#4a5568]"}
//                                 ${bg}`}
//                             style={{
//                                 background: bg,
//                                 borderRight,
//                                 borderBottom,
//                             }}
//                         >
//                             {val || ""}
//                         </div>
//                     );
//                 })
//             )}
//         </div>
//     );
// }

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
        <span className={`inline-flex items-center px-2 py-0.5 sm:rounded-sm md:rounded-md xs:text-xs 
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
                                How <span className=' '> SudokuPlays Works? </span>

                            </h1>
                            <p className="text-center dark:text-[#8b97a8] justify-center flexitems-center font-semibold text-gray-600 md:text-md xl:text-xl sx:text-sx sm:text-sm 
                            lg:text-lg max-w-lg mx-auto leading-relaxed mb-6 mt-6 sx:mb-4">
                                Fill every row, column, and 3×3 box with the digits 1–9. No repeats. Simple rules — deep strategy.
                            </p>

                            {/* Navigation to sections*/}
                            <div className="flex flex-wrap gap-3 items-center justify-center">
                                {sections.map((s) => (
                                    <a
                                        key={s.id}
                                        href={`#${s.id}`}
                                        onClick={() => setActiveSection(s.id)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 md:rounded-md sm:rounded-sm lg:rounded-lg 
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
                        {/* <div className="flex flex-col items-center gap-3">
                            <p className="sm:text-sm md:text-md dark:text-[#4a5568] uppercase">Interactive Demo</p>
                            <div className="p-4 rounded-2xl border dark:border-[#2d3748] dark:bg-[#161b22]">
                                
                            </div>
                            <p className="lg:text-lg sm:text-smmd:text-md xs:text-xs text-gray-600 dark:text-[#4a5568] text-center">Click any cell to see highlighting</p>
                        </div> */}
                    </div>

                    {/* Section 01: Objective */}
                    <section className="mb-12">
                        <SectionAnchor id="objective" />
                        <div className="flex items-center gap-3 mb-6">
                            <span className="xs:text-xs md:text-md lg:text-lg text-sm dark:text-[#4a5568]">01</span>
                            <div className="h-px flex-1 bg-gray-600 dark:bg-[#2d3748]" />
                            <h2 className="text-xl font-bold text-gray-600 dark:text-[#e2e8f0]" style={{ fontFamily: "Outfit, sans-serif" }}>The Objective</h2>
                            <div className="h-px flex-1 bg-gray-600 dark:bg-[#2d3748]" />
                        </div>

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

                    {/* Section 02: Controls */}
                    <section className="mb-12">
                        <SectionAnchor id="controls" />
                        <div className="flex items-center gap-3 mb-6">
                            <span className="sm:text-sm text-xs lg:text-lg md:text-md dark:text-[#4a5568]">02</span>
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
                            <span className="sm:text-sm xs:text-xs lg:text-lg md:text-md text-gray-600 dark:text-[#4a5568]">03</span>
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
                                <span className="sm:text-sm lg:text-lg xl:text-xl md:text-md xs:text-xs dark:text-[#4a5568]">04</span>
                                <div className="h-px flex-1 bg-gray-600 dark:bg-[#2d3748]" />
                                <h2 className="text-lg font-bold text-gray-600 dark:text-[#e2e8f0]" style={{ fontFamily: "Outfit, sans-serif" }}>Number Pad</h2>
                            </div>
                            <div className="lg:rounded-lg md:rounded-md sm:rounded-smxl:rounded-xl 
                            border dark:border-[#2d3748] dark:bg-[#161b22] p-5">
                                {/* Mini numpad visual */}
                                <div className="grid grid-cols-5 gap-2 mb-5">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                                        <div
                                            key={n}
                                            className="relative sm:rounded-sm md:rounded-md xs:rouonded-xs lg:rounded-lg
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
                                        className="sm:rounded-sm md:rounded-md xs:rouonded-xs lg:rounded-lg dark:text-[#8b97a8]
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
                                <span className="text-xs sm:text-sm md:text-md lg:text-lg text-gray-600 dark:text-[#4a5568]">05</span>
                                <div className="h-px flex-1 bg-gray-600 dark:bg-[#2d3748]" />
                                <h2 className="md:text-md sm:text-sm xs:text-xs lg:text-lg font-bold dark:text-[#e2e8f0]" style={{ fontFamily: "Outfit, sans-serif" }}>Keyboard Navigation</h2>
                            </div>
                            <div className="md:rounded-md sm:rounded-sm lg:rounded-lg xl:rounded-xl border dark:border-[#2d3748] dark:bg-[#161b22] p-5 h-[calc(100%-52px)]">
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
                                <div className="md:rounded-md sm:rounded-sm lg:rounded-lg xl:rounded-xl bg-[#f8f9fa]
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
                            <span className="text-xs sm:text-sm md:text-md lg:text-lg text-gray-600 dark:text-[#4a5568]">06</span>
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
                            <span className="sm:text-sm md:text-md xs:text-xs lg:text-lg dark:text-[#4a5568]">07</span>
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
                        <div className="mt-5 xl:rounded-xl lg:rounded-lg md:rounded-md sm:rounded-sm border border-[#2d3748] bg-[#] dark:bg-[#161b22] p-5">
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