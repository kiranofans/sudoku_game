import React from 'react';
import { Link } from 'react-router-dom';

interface GameStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    status: 'won' | 'lost';
    time: string;
    score: number | null;
    difficulty: string;
    scoreBreakdown?: {
        gross: number;
        penalty: number;
        bonus: number;
        multiplier: number;
        time: number;
    } | null;
}

const GameStatusModal: React.FC<GameStatusModalProps> = ({ isOpen, onClose, status, time, score, difficulty, scoreBreakdown }) => {
    if (!isOpen) return null;

    const tips = [
        "Sharpen your mind with fun, challenging Sudoku puzzles anytime, anywhere!",
        "Try scanning rows and columns first to find 'naked singles' — cells where only one number can fit.",
        "Use pencil marks to keep track of possibilities in empty cells. It's a game-changer for harder puzzles!",
        "Focus on 3x3 blocks that are almost full. They often hold the key to the next move.",
        "Don't guess! Every Sudoku puzzle has a logical solution that doesn't require guessing."
    ];

    const isWon = status === 'won';
    const randomTip = tips[0];

    return (
        <div className="fixed inset-0 bg-black/80 flex flex-col justify-center items-center z-[9999] p-4 backdrop-blur-[4px]">
            <h2 className="text-[clamp(2.5rem,8vw,4rem)] font-black text-white mb-2 text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
                {isWon ? 'Congratulations' : 'Game Over'}
            </h2>
            <div className="text-4xl mb-6 animate-bounce">
                {isWon ? '🎉🥳🎊' : '😞❌🚫'}
            </div>

            <div className="bg-white dark:bg-[#1a1a1a] w-full max-w-[420px] rounded-[24px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)] text-center text-[#333] dark:text-[#eee]">
                <h2 className="text-[1.75rem] font-extrabold mb-2 text-black dark:text-white">
                    {isWon ? 'Round Completed' : 'Mistake Limit Reached'}
                </h2>
                {!isWon && (
                    <p className="text-[#888] mb-6 font-medium">You have reached the mistake limit</p>
                )}

                <div className={`grid grid-cols-3 gap-4 ${isWon ? 'mb-6' : 'mb-6'}`}>
                    <div className="flex flex-col gap-1">
                        <span className="text-[0.75rem] text-[#888] font-bold uppercase tracking-wider">Time</span>
                        <span className="text-[1.1rem] font-black text-black dark:text-white">{time}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[0.75rem] text-[#888] font-bold uppercase tracking-wider">Final Score</span>
                        <span className="text-[1.1rem] font-black text-black dark:text-white">{score?.toLocaleString() || '0'}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[0.75rem] text-[#888] font-bold uppercase tracking-wider">Difficulty</span>
                        <span className="text-[1.1rem] font-black text-black dark:text-white capitalize">{difficulty.replace('-', ' ')}</span>
                    </div>
                </div>

                {isWon && scoreBreakdown && (
                    <div className="bg-[#f8fafc] dark:bg-[#252525] rounded-[16px] p-4 mb-6 border border-[#e2e8f0] dark:border-[#333] text-left">
                        <h3 className="text-[0.75rem] font-black text-[#64748b] uppercase tracking-[0.1em] mb-3 border-b border-[#e2e8f0] dark:border-[#333] pb-1">
                            Score Breakdown
                        </h3>
                        <div className="space-y-2 text-[0.9rem]">
                            <div className="flex justify-between items-center text-[#444] dark:text-[#ccc] font-medium">
                                <span className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                    Gross Score
                                </span>
                                <span className="font-bold">{scoreBreakdown.gross.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-[#ef4444] font-medium">
                                <span className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                    Time Penalty
                                </span>
                                <span className="font-bold">-{scoreBreakdown.penalty.toLocaleString()}</span>
                            </div>
                            {scoreBreakdown.bonus > 0 && (
                                <div className="flex justify-between items-center text-blue-500 font-medium">
                                    <span className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                        Speed Bonus
                                    </span>
                                    <span className="font-bold">+{scoreBreakdown.bonus.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="pt-2 mt-1 border-t border-dashed border-[#cbd5e1] dark:border-[#444] text-[0.7rem] text-[#94a3b8] font-bold italic">
                                {scoreBreakdown.penalty === 0 
                                    ? `Calculation: ${scoreBreakdown.gross} ${scoreBreakdown.bonus > 0 ? `+ ${scoreBreakdown.bonus} (Speed Bonus)` : '(No time penalty)'}` 
                                    : `Calculation: ${scoreBreakdown.gross} - (${scoreBreakdown.time}s × ${scoreBreakdown.multiplier})`}
                            </div>
                        </div>
                    </div>
                )}

                <div className="relative border-t border-[#eee] dark:border-[#333] my-6 flex justify-center">
                    <span className="absolute -top-2.5 bg-white dark:bg-[#1a1a1a] px-2.5 text-[0.8rem] text-[#aaa] font-semibold uppercase">
                        {isWon ? 'Useful Tip' : 'Improve Your Game'}
                    </span>
                </div>

                <div className="bg-[#f0f7ff] dark:bg-[#1c252e] rounded-[16px] p-5 mb-8">
                    {isWon ? (
                        <p className="text-[0.95rem] leading-relaxed text-[#444] dark:text-[#bbb] font-medium">{randomTip}</p>
                    ) : (
                        <div className="space-y-3">
                            <p className="text-[0.95rem] leading-relaxed text-[#444] dark:text-[#bbb] font-medium">
                                Want to master Sudoku? Check out our pro strategies to reduce mistakes and solve puzzles faster!
                            </p>
                            <Link
                                to="/sudokuTips"
                                className="text-[var(--num-pad-bg)] font-bold hover:underline inline-block"
                                onClick={onClose}
                            >
                                View Sudoku Tips &rarr;
                            </Link>
                        </div>
                    )}
                </div>

                <button
                    className="w-full p-4 rounded-[50px] !bg-[#2c8fd1] hover:!bg-[#2980b9] !text-white text-[1.1rem] font-bold !border-none cursor-pointer transition-all duration-200 shadow-[0_4px_12px_rgba(44,143,209,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(44,143,209,0.4)] active:translate-y-0"
                    onClick={onClose}
                >
                    {isWon ? 'Back to Home' : 'Play Again'}
                </button>
            </div>
        </div>
    );
};

export default GameStatusModal;
