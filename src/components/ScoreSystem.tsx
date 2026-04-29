import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { GameHistoryEntry } from '../lib/persistenceStorage.ts';

interface ScoreSystemProps {
  score: number | null;
  history?: GameHistoryEntry[];
  isMobile?: boolean;
}

export const ScoreSystem: React.FC<ScoreSystemProps> = ({ score, history = [], isMobile }) => {
  const [showHistory, setShowHistory] = useState(false);

  const historyIcon = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[var(--num-pad-bg)] shrink-0 cursor-pointer transition-all duration-200 hover:text-[var(--score-value)] hover:scale-110 ml-1"
      aria-labelledby='svg-title svg-description'
      onClick={(e) => {
        e.stopPropagation();
        setShowHistory(!showHistory);
      }}
      role="button"
      aria-label="Toggle score history"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.stopPropagation();
          setShowHistory(!showHistory);
        }
      }}
    >
      <title id="svg-title">Score History icon button for mobile</title>
      <desc id="svg-descriptions">Score history icon button for mobile portrait screens</desc>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );

  const historyOverlay = showHistory && createPortal(
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-[99999] flex justify-center items-center p-4"
      onClick={() => setShowHistory(false)}
    >
      <div
        className="bg-white/95 dark:bg-[#1a1a1a]/95 w-full max-w-[360px] max-h-[75vh] rounded-[2rem] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-[slideUpFade_0.4s_cubic-bezier(0.16,1,0.3,1)] backdrop-blur-2xl border border-white/20 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 bg-[var(--num-pad-bg)] text-white flex justify-between items-center shrink-0">
          <div className="flex flex-col">
            <h3 className="m-0 text-lg font-black tracking-tight">24-Hour Activity</h3>
            <span className="text-[0.65rem] opacity-70 font-bold uppercase tracking-wider">Game History Log</span>
          </div>
          <button
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-2xl cursor-pointer hover:bg-white/20 transition-colors border-none text-white"
            onClick={() => setShowHistory(false)}
          >
            &times;
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 text-left custom-scrollbar">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-5 text-gray-400">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-20 mb-4">
                <circle cx="12" cy="12" r="10" aria-labelledby='svg-title svg-description' />
                <title id='svg-title'>No games completed yet</title>
                <desc id='svg-description'>A clock icon</desc>
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <p className="italic text-sm m-0">No games completed yet</p>
            </div>
          ) : (
            history.map((entry, index) => (
              <div key={index} className="bg-black/5 dark:bg-white/5 rounded-2xl p-4 border border-black/5 dark:border-white/5 transition-all duration-300 hover:bg-black/[0.08] dark:hover:bg-white/[0.08]">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex flex-col">
                    <span className="text-[0.7rem] font-black text-[var(--num-pad-bg)] uppercase tracking-wider">{entry.difficulty.replace('-', ' ')}</span>
                    <span className="text-[0.6rem] text-gray-500 font-bold uppercase tracking-tighter">Completed At</span>
                  </div>
                  <span className="bg-black/5 dark:bg-white/10 px-2 py-1 rounded-md text-[0.65rem] font-bold text-gray-500">{new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div className="flex flex-col items-center p-2 rounded-xl bg-white/50 dark:bg-black/20">
                    <span className="text-[0.55rem] text-gray-400 uppercase font-black tracking-tighter mb-1">Score</span>
                    <span className="text-[0.85rem] font-black text-[var(--text-color)] tabular-nums">{entry.score.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-xl bg-white/50 dark:bg-black/20">
                    <span className="text-[0.55rem] text-gray-400 uppercase font-black tracking-tighter mb-1">Time</span>
                    <span className="text-[0.85rem] font-black text-[var(--text-color)] tabular-nums">{entry.time}</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-xl bg-white/50 dark:bg-black/20">
                    <span className="text-[0.55rem] text-gray-400 uppercase font-black tracking-tighter mb-1">Errors</span>
                    <span className="text-[0.85rem] font-black text-[var(--text-color)] tabular-nums">{entry.mistakes}</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-xl bg-white/50 dark:bg-black/20">
                    <span className="text-[0.55rem] text-gray-400 uppercase font-black tracking-tighter mb-1">Hints</span>
                    <span className="text-[0.85rem] font-black text-[var(--text-color)] tabular-nums">{entry.hintsUsed}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>,
    document.body
  );

  if (isMobile) {
    return (
      <>
        <div className="flex items-center gap-2 px-3 py-1 bg-black/5 dark:bg-white/10 rounded-full backdrop-blur-sm border border-white/5">
          <div className="flex items-center gap-1.5 border-r border-black/10 dark:border-white/10 pr-2">
            <span className="text-[0.6rem] font-bold text-[var(--score-label)] uppercase tracking-wider">Score</span>
            <span className="text-sm font-bold text-[var(--score-value)] font-mono leading-none">
              {score !== null ? score.toLocaleString() : "0"}
            </span>
          </div>
          {historyIcon}
        </div>
        {historyOverlay}
      </>
    );
  }

  return (
    <>
      <div className="score-widget desktop-only-score">
        <div className="score-main">
          <span className="score-label">
            <b className='text-sm'>Score:</b>
          </span>
          <span className="score-value">
            {score !== null ? score.toLocaleString() : "- - - -"}
          </span>
        </div>
        <div className="score-refresh-notice">
          <span className='font-bold text-[0.55rem]'>Score resets every 24 hours</span>
        </div>
      </div>

      {/* Desktop History Button */}
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="desktop-only-score w-full mt-2 p-[10px_15px] flex items-center justify-center gap-2 bg-[var(--score-bg)] border border-[var(--divider-color)] text-[var(--score-label)] rounded-lg cursor-pointer transition-all duration-200 shadow-[0_2px_4px_rgba(0,0,0,0.05)] hover:bg-[var(--button-bg)] hover:text-[var(--score-value)] hover:-translate-y-px hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)] group"
        aria-label="Toggle score history"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" className="text-[var(--num-pad-bg)] shrink-0" aria-labelledby='svg-title svg-description'>
          <circle cx="12" cy="12" r="10" />
          <title id='svg-title'>History icon button for web/desktop</title>
          <desc id='svg-description'>Score/game play history icon button for web/desktop</desc>
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className="text-sm font-bold uppercase tracking-wider">History</span>
      </button>

      {historyOverlay}
    </>
  );
};

export default ScoreSystem;
