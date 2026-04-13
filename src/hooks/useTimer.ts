import { useEffect, useRef, useState } from "react";

export function useTimer(resetKey: number, isGameOver: boolean) {
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

    const start = () => setIsRunning(true);
    const pause = () => setIsRunning(false);

    return { timeLeft, isRunning, start, pause };
}