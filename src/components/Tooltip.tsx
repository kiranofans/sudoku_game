import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
    text: string;
    children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const pressTimerRef = useRef<NodeJS.Timeout | null>(null);
    const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
    const isTouchDeviceRef = useRef(false);

    const startPress = (e: React.TouchEvent) => {
        isTouchDeviceRef.current = true;
        // Clear any existing timers
        if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

        // Start 2-second timer for mobile long-press
        pressTimerRef.current = setTimeout(() => {
            setIsVisible(true);
        }, 2000);
    };

    const cancelPress = () => {
        if (pressTimerRef.current) {
            clearTimeout(pressTimerRef.current);
            pressTimerRef.current = null;
        }

        // Auto-hide after 1.5s if it was shown
        if (isVisible) {
            hideTimerRef.current = setTimeout(() => {
                setIsVisible(false);
            }, 1500);
        }
    };

    const showTooltipHover = () => {
        // Ignore hover events on touch devices (where they are simulated)
        if (isTouchDeviceRef.current) return;

        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        setIsVisible(true);
    };

    const hideTooltipImmediate = () => {
        if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        setIsVisible(false);
    };

    useEffect(() => {
        // Reset the touch flag if mouse moves - helps with hybrid devices
        const handleMouseMove = () => {
            isTouchDeviceRef.current = false;
        };
        window.addEventListener('mousemove', handleMouseMove, { once: true });

        return () => {
            if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div
            className="tooltip-container"
            onMouseEnter={showTooltipHover}
            onMouseLeave={hideTooltipImmediate}
            onTouchStart={startPress}
            onTouchEnd={cancelPress}
            onTouchMove={cancelPress}
            onTouchCancel={cancelPress}
        >
            {children}
            {isVisible && (
                <div className="tooltip-bubble">
                    {text}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
