import { useEffect, useState } from "react";

export function useTimer(initial = 0, isGameOver: boolean) {
    const [timeLeft, setTimeLeft] = useState(initial);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        if (!isRunning || isGameOver) return;

        const interval = setInterval(() => {
            setTimeLeft(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, isGameOver]);

    const start = () => setIsRunning(true);
    const pause = () => setIsRunning(false);

    return { timeLeft, isRunning, start, pause };
}