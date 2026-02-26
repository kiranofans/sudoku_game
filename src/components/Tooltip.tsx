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
        // Prevent default browser behavior like context menus on some devices
        // e.preventDefault(); // CAUTION: this might break the button click below

        isTouchDeviceRef.current = true;
        if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

        // Start 800ms timer for better responsiveness while still being a "long-press"
        // 2-3 seconds is very long in UX time
        pressTimerRef.current = setTimeout(() => {
            setIsVisible(true);
        }, 800);
    };

    const endPress = () => {
        if (pressTimerRef.current) {
            clearTimeout(pressTimerRef.current);
            pressTimerRef.current = null;
        }

        // If it was already shown, keep it for a bit so they can read it
        if (isVisible) {
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
            hideTimerRef.current = setTimeout(() => {
                setIsVisible(false);
            }, 2000);
        }
    };

    const showTooltipHover = () => {
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
            onTouchEnd={endPress}
            onTouchMove={endPress} // Cancel if they scroll/move finger
            onTouchCancel={endPress}
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
