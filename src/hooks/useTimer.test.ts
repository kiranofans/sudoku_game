import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useTimer } from './useTimer';

describe('useTimer Hook', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should initialize with 0 seconds and running state', () => {
        const { result } = renderHook(() => useTimer(0, false));
        expect(result.current.timeLeft).toBe(0);
        expect(result.current.isRunning).toBe(true);
    });

    it('should increment time every second', () => {
        const { result } = renderHook(() => useTimer(0, false));
        
        act(() => {
            vi.advanceTimersByTime(1000);
        });
        expect(result.current.timeLeft).toBe(1);

        act(() => {
            vi.advanceTimersByTime(2000);
        });
        expect(result.current.timeLeft).toBe(3);
    });

    it('should reset timer when resetKey changes', () => {
        const { result, rerender } = renderHook(
            ({ key }) => useTimer(key, false),
            { initialProps: { key: 0 } }
        );

        act(() => {
            vi.advanceTimersByTime(5000);
        });
        expect(result.current.timeLeft).toBe(5);

        rerender({ key: 1 });
        expect(result.current.timeLeft).toBe(0);
        expect(result.current.isRunning).toBe(true);
    });

    it('should pause and resume', () => {
        const { result } = renderHook(() => useTimer(0, false));

        act(() => {
            result.current.pause();
        });
        expect(result.current.isRunning).toBe(false);

        act(() => {
            vi.advanceTimersByTime(3000);
        });
        expect(result.current.timeLeft).toBe(0);

        act(() => {
            result.current.start();
        });
        expect(result.current.isRunning).toBe(true);

        act(() => {
            vi.advanceTimersByTime(2000);
        });
        expect(result.current.timeLeft).toBe(2);
    });

    describe('Auto-Pause Logic', () => {
        it('should pause after 2 minutes of inactivity', () => {
            const { result } = renderHook(() => useTimer(0, false, false, [0]));

            act(() => {
                vi.advanceTimersByTime(119000);
            });
            expect(result.current.isRunning).toBe(true);

            act(() => {
                vi.advanceTimersByTime(1000);
            });
            expect(result.current.isRunning).toBe(false);
        });

        it('should reset inactivity timer on dependency change', () => {
            const { result, rerender } = renderHook(
                ({ deps }) => useTimer(0, false, false, deps),
                { initialProps: { deps: [0] } }
            );

            act(() => {
                vi.advanceTimersByTime(60000);
            });
            
            // Activity happens
            rerender({ deps: [1] });

            act(() => {
                vi.advanceTimersByTime(61000);
            });
            expect(result.current.isRunning).toBe(true);

            act(() => {
                vi.advanceTimersByTime(59000);
            });
            expect(result.current.isRunning).toBe(false);
        });

        it('should pause after 1:30 minutes if tab is hidden', () => {
            // Mock visibilityState
            Object.defineProperty(document, 'visibilityState', {
                configurable: true,
                get: () => 'visible',
            });

            const { result } = renderHook(() => useTimer(0, false));

            // Change visibility to hidden
            act(() => {
                Object.defineProperty(document, 'visibilityState', {
                    configurable: true,
                    get: () => 'hidden',
                });
                document.dispatchEvent(new Event('visibilitychange'));
            });

            act(() => {
                vi.advanceTimersByTime(89000);
            });
            expect(result.current.isRunning).toBe(true);

            act(() => {
                vi.advanceTimersByTime(1000);
            });
            expect(result.current.isRunning).toBe(false);
        });

        it('should cancel visibility pause if tab becomes visible before timeout', () => {
            Object.defineProperty(document, 'visibilityState', {
                configurable: true,
                get: () => 'visible',
            });

            const { result } = renderHook(() => useTimer(0, false));

            // Go hidden
            act(() => {
                Object.defineProperty(document, 'visibilityState', {
                    configurable: true,
                    get: () => 'hidden',
                });
                document.dispatchEvent(new Event('visibilitychange'));
            });

            act(() => {
                vi.advanceTimersByTime(60000);
            });

            // Go visible again
            act(() => {
                Object.defineProperty(document, 'visibilityState', {
                    configurable: true,
                    get: () => 'visible',
                });
                document.dispatchEvent(new Event('visibilitychange'));
            });

            act(() => {
                vi.advanceTimersByTime(40000);
            });
            expect(result.current.isRunning).toBe(true);
        });
    });
});
