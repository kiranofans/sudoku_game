import { renderHook, act } from '@testing-library/react';
import { useScore } from './useScore';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock the persistence storage to avoid side effects
vi.mock('../lib/persistenceStorage.ts', () => ({
  loadPersistedScore: vi.fn(() => null),
  savePersistedScore: vi.fn(),
}));

describe('useScore Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should initialize with a score of null', () => {
    const { result } = renderHook(() => useScore('easy'));
    expect(result.current.score).toBeNull();
  });

  it('should add 100 points for a correct move', () => {
    const { result } = renderHook(() => useScore('easy'));
    
    act(() => {
      result.current.addCorrectMoveScore();
    });
    
    expect(result.current.score).toBe(100);
  });

  it('should deduct 50 points for a mistake', () => {
    const { result } = renderHook(() => useScore('easy'));
    
    act(() => {
      result.current.addCorrectMoveScore(); // +100
      result.current.deductMistakeScore();  // -50
    });
    
    expect(result.current.score).toBe(50);
  });

  it('should deduct 50 points for a hint', () => {
    const { result } = renderHook(() => useScore('easy'));
    
    act(() => {
      result.current.addCorrectMoveScore(); // +100
      result.current.deductHintScore();     // -50
    });
    
    expect(result.current.score).toBe(50);
  });

  it('should not allow score to go below 0', () => {
    const { result } = renderHook(() => useScore('easy'));
    
    act(() => {
      result.current.deductMistakeScore();
    });
    
    expect(result.current.score).toBe(0);
  });

  describe('Final Win Calculation - Easy/Medium', () => {
    it('should apply time penalty for Easy difficulty (4x)', () => {
      const { result } = renderHook(() => useScore('easy'));
      
      act(() => {
        // Mock starting score of 1000
        for(let i=0; i<10; i++) result.current.addCorrectMoveScore();
        
        // Calculate win after 100 seconds
        // Penalty = 100s * 4 (multiplier) = 400
        // Expected = 1000 - 400 = 600
        result.current.calculateFinalWin(100);
      });
      
      expect(result.current.score).toBe(600);
      expect(result.current.scoreBreakdown?.penalty).toBe(400);
    });

    it('should apply heavier time penalty for Very Easy difficulty (5x)', () => {
      const { result } = renderHook(() => useScore('very-easy'));
      
      act(() => {
        for(let i=0; i<10; i++) result.current.addCorrectMoveScore();
        
        // Penalty = 100s * 5 = 500
        // Expected = 1000 - 500 = 500
        result.current.calculateFinalWin(100);
      });
      
      expect(result.current.score).toBe(500);
      expect(result.current.scoreBreakdown?.penalty).toBe(500);
    });
  });

  describe('Final Win Calculation - Hard/Expert', () => {
    it('should NOT apply time penalty for Hard difficulty', () => {
      const { result } = renderHook(() => useScore('hard'));
      
      act(() => {
        for(let i=0; i<10; i++) result.current.addCorrectMoveScore(); // 1000
        
        // Even after 1000 seconds, no penalty
        result.current.calculateFinalWin(1000);
      });
      
      expect(result.current.score).toBe(1000);
      expect(result.current.scoreBreakdown?.penalty).toBe(0);
    });

    it('should award speed bonus for Hard difficulty if won within 5 mins', () => {
      const { result } = renderHook(() => useScore('hard'));
      
      act(() => {
        for(let i=0; i<10; i++) result.current.addCorrectMoveScore(); // 1000
        
        // 200 seconds is < 300s (5 mins)
        // Bonus = 1000
        // Expected = 1000 + 1000 = 2000
        result.current.calculateFinalWin(200);
      });
      
      expect(result.current.score).toBe(2000);
      expect(result.current.scoreBreakdown?.bonus).toBe(1000);
    });

    it('should award speed bonus for Expert difficulty if won within 6 mins', () => {
      const { result } = renderHook(() => useScore('expert'));
      
      act(() => {
        for(let i=0; i<10; i++) result.current.addCorrectMoveScore(); // 1000
        
        // 300 seconds is < 360s (6 mins)
        // Bonus = 2000
        // Expected = 1000 + 2000 = 3000
        result.current.calculateFinalWin(300);
      });
      
      expect(result.current.score).toBe(3000);
      expect(result.current.scoreBreakdown?.bonus).toBe(2000);
    });
  });

  it('should reset score to null', () => {
    const { result } = renderHook(() => useScore('easy'));
    
    act(() => {
      result.current.addCorrectMoveScore();
      result.current.resetScore();
    });
    
    expect(result.current.score).toBeNull();
    expect(result.current.scoreBreakdown).toBeNull();
  });
});
