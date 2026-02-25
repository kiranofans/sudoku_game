import React, { useState, useRef, useEffect } from 'react';
import { useTheme, Theme } from './ThemeContext';

const ThemeSelector: React.FC = () => {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme);
        setIsOpen(false);
    };

    return (
        <div className="theme-selector-container" ref={menuRef}>
            <button
                className="theme-icon-button"
                onClick={toggleMenu}
                aria-label="Change theme"
                title="Change theme"
            >
                {resolvedTheme === 'dark' ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="theme-icon-img">
                        <path d="M9.27205 2.40633C9.35086 2.22913 9.37643 2.03283 9.34566 1.84135C9.3149 1.64987 9.22911 1.47147 9.09876 1.32787C8.96841 1.18427 8.79912 1.08168 8.6115 1.03258C8.42388 0.98348 8.22604 0.989995 8.04205 1.05133C6.59005 1.53533 5.43205 2.48833 4.37005 3.55033C3.30245 4.61 2.45512 5.87048 1.8769 7.25913C1.29867 8.64777 1.00098 10.1371 1.00098 11.6413C1.00098 13.1456 1.29867 14.6349 1.8769 16.0235C2.45512 17.4122 3.30245 18.6727 4.37005 19.7323C8.88805 24.2513 15.8801 23.9933 20.3461 19.5273C21.4081 18.4653 22.3601 17.3073 22.8441 15.8543C22.9034 15.6757 22.9112 15.484 22.8664 15.3011C22.8217 15.1183 22.7262 14.9518 22.591 14.8208C22.4558 14.6898 22.2864 14.5996 22.1023 14.5606C21.9181 14.5216 21.7267 14.5354 21.5501 14.6003C17.9601 15.9223 13.8751 15.3343 11.1171 12.5753C8.35005 9.80833 7.78805 5.74433 9.27205 2.40633Z" fill="currentColor" />
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="theme-icon-img">
                        <g>
                            <path d="M4.575 4.575L5.689 5.689M1.5 12H3.075M4.575 19.425L5.689 18.311M19.425 19.425L18.311 18.311M22.5 12H20.925M19.425 4.575L18.311 5.689M12 1.5V3.075" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 18C15.3135 18 18 15.3135 18 12C18 8.6865 15.3135 6 12 6C8.6865 6 6 8.6865 6 12C6 15.3135 8.6865 18 12 18Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                            <path d="M12 22.5008V20.9258" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                    </svg>
                )}
            </button>

            {isOpen && (
                <div className="theme-dropdown-menu">
                    <button
                        className={`theme-menu-item ${theme === 'light' ? 'active' : ''}`}
                        onClick={() => handleThemeChange('light')}
                    >
                        Light
                    </button>
                    <button
                        className={`theme-menu-item ${theme === 'dark' ? 'active' : ''}`}
                        onClick={() => handleThemeChange('dark')}
                    >
                        Dark
                    </button>
                    <button
                        className={`theme-menu-item ${theme === 'system' ? 'active' : ''}`}
                        onClick={() => handleThemeChange('system')}
                    >
                        System
                    </button>
                </div>
            )}
        </div>
    );
};

export default ThemeSelector;
