import { useEffect, useRef, useState, useCallback } from "react";

export function useTimer(
    resetKey: number,
    isGameOver: boolean,
    isLoading: boolean = false,
    activityDependencies: any[] = []
) {
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const visibilityTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // reset timer when new game starts
    useEffect(() => {
        setTimeLeft(0);
        setIsRunning(true);
    }, [resetKey]);

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        if (!isRunning || isGameOver) return;

        intervalRef.current = setInterval(() => {
            setTimeLeft(prev => prev + 1);
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isRunning, isGameOver]);

    const start = useCallback(() => setIsRunning(true), []);
    const pause = useCallback(() => setIsRunning(false), []);

    // Auto-pause on inactivity (2 minutes)
    useEffect(() => {
        if (!isRunning || isGameOver || isLoading) return;

        const timeout = setTimeout(() => {
            pause();
        }, 120000); // 2 minutes

        return () => clearTimeout(timeout);
    }, [isRunning, isGameOver, isLoading, pause, ...activityDependencies]);

    // Auto-pause on visibility change (away for 1:30 minutes)
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                if (isRunning && !isGameOver) {
                    visibilityTimeoutRef.current = setTimeout(() => {
                        pause();
                    }, 90000); // 1:30 minutes
                }
            } else {
                if (visibilityTimeoutRef.current) {
                    clearTimeout(visibilityTimeoutRef.current);
                    visibilityTimeoutRef.current = null;
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (visibilityTimeoutRef.current) clearTimeout(visibilityTimeoutRef.current);
        };
    }, [isRunning, isGameOver, pause]);

    return { timeLeft, isRunning, start, pause };
}