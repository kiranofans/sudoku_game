import { useState, useEffect, useCallback } from 'react';
import { loadPersistedScore, savePersistedScore } from '../lib/persistenceStorage.ts';
import { Difficulty } from '../lib/generatesSudoku.ts';

export interface ScoreBreakdown {
  gross: number;
  penalty: number;
  bonus: number;
  multiplier: number;
  time: number;
}

export function useScore(difficulty: Difficulty) {
  const [score, setScore] = useState<number | null>(loadPersistedScore());
  const [scoreBreakdown, setScoreBreakdown] = useState<ScoreBreakdown | null>(null);

  // Score multiplier based on difficulty (used for time penalty on easier modes)
  const scoreMultiplier: number = ({
    'very-easy': 4,
    easy: 3.5,
    medium: 3.2,
    hard: 3.15,
    expert: 2.5,
  } as Record<string, number>)[difficulty];

  // Persist score changes
  useEffect(() => {
    savePersistedScore(score);
  }, [score]);

  const addCorrectMoveScore = useCallback(() => {
    // Same points for all difficulties (100 pts per correct move)
    setScore(prev => (prev || 0) + 100);
  }, []);

  const deductHintScore = useCallback(() => {
    setScore(prev => {
      const current = prev || 0;
      // 50-point penalty per hint
      return Math.max(0, current - 50);
    });
  }, []);

  const deductMistakeScore = useCallback(() => {
    setScore(prev => {
      const current = prev || 0;
      // Flat 50-point penalty per mistake.
      const penalty = 50;
      return Math.max(0, current - penalty);
    });
  }, []);

  /**
   * Final score calculation with time used
   * @param timeLeft - Current time from useTimer
   * @returns The final move score before penalty (gross)
   */
  const calculateFinalWin = useCallback((timeLeft: number) => {
    setScore(prev => {
      const currentMoveScore = prev || 0;

      const isEasyOrMedium = difficulty === 'very-easy' || difficulty === 'easy' || difficulty === 'medium';

      let penalty = 0;
      let bonus = 0;

      if (isEasyOrMedium) {
        // Time penalty for easy/medium
        penalty = timeLeft * scoreMultiplier;
      } else {
        // No time penalty for Hard and Expert, but speed bonuses
        if (difficulty === 'hard' && timeLeft <= 300) {
          bonus = 1000;
        } else if (difficulty === 'expert' && timeLeft <= 360) {
          bonus = 2000;
        }
        // Beyond 8 minutes (480s), no bonus is awarded
      }

      const finalScore = Math.max(0, currentMoveScore - penalty + bonus);

      setScoreBreakdown({
        gross: currentMoveScore,
        penalty: penalty,
        bonus: bonus,
        multiplier: scoreMultiplier,
        time: timeLeft
      });

      return finalScore;
    });
  }, [scoreMultiplier]);

  const resetScore = useCallback(() => {
    setScore(null);
    setScoreBreakdown(null);
  }, []);

  return {
    score,
    scoreBreakdown,
    scoreMultiplier,
    addCorrectMoveScore,
    deductMistakeScore,
    calculateFinalWin,
    deductHintScore,
    resetScore
  };
}
