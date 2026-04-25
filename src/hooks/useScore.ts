import { useState, useEffect, useCallback } from 'react';
import { loadPersistedScore, savePersistedScore } from '../lib/persistenceStorage.ts';
import { Difficulty } from '../lib/generatesSudoku.ts';

export interface ScoreBreakdown {
  gross: number;
  penalty: number;
  multiplier: number;
  time: number;
}

export function useScore(difficulty: Difficulty) {
  const [score, setScore] = useState<number | null>(loadPersistedScore());
  const [scoreBreakdown, setScoreBreakdown] = useState<ScoreBreakdown | null>(null);

  // Score multiplier based on difficulty
  const scoreMultiplier: number = ({
    'very-easy': 1,
    easy: 2,
    medium: 3,
    hard: 5,
    expert: 10
  } as Record<string, number>)[difficulty];

  // Persist score changes
  useEffect(() => {
    savePersistedScore(score);
  }, [score]);

  const addCorrectMoveScore = useCallback(() => {
    setScore(prev => (prev || 0) + (100 * scoreMultiplier));
  }, [scoreMultiplier]);

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
      const penalty = timeLeft * scoreMultiplier;
      const finalScore = Math.max(0, currentMoveScore - penalty);

      setScoreBreakdown({
        gross: currentMoveScore,
        penalty: penalty,
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
    resetScore
  };
}
