import React from 'react';

interface ScoreSystemProps {
  score: number | null;
  isMobile?: boolean;
}

export const ScoreSystem: React.FC<ScoreSystemProps> = ({ score, isMobile }) => {
  return (
    <div className={isMobile ? "mobile-only-score" : "score-widget desktop-only-score"}>
      <div className={isMobile ? "score-main-mobile" : "score-main"}>
        <span className={isMobile ? "mobile-score-label" : "score-label"}><b className='text-sm'>Score:</b></span>
        <span className={isMobile ? "mobile-score-value" : "score-value"}>
          {score !== null ? score.toLocaleString() : "- - - -"}
        </span>
      </div>
      <div className={"score-refresh-notice" + (isMobile ? " mobile-notice" : "")}>
        <span className='font-bold text-[0.55rem]'>Score refreshes every 24 hours</span>
      </div>
    </div>
  );
};

export default ScoreSystem;
