import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // This allows the server to finish the build without crashing.
    const [theme, setTheme] = useState<Theme>('system');

    // 1. Start with a safe default for the server
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

    // 1. Initial hydration from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('theme') as Theme;
        if (saved) {
            setTheme(saved);
        }
    }, []);

    // 2. Apply theme changes to DOM and localStorage
    useEffect(() => {
        const updateTheme = () => {
            const root = window.document.documentElement;
            let nextResolved: 'light' | 'dark';
            
            if (theme === 'system') {
                nextResolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            } else {
                nextResolved = theme as 'light' | 'dark';
            }

            setResolvedTheme(nextResolved);
            root.classList.remove('light-theme', 'dark-theme');
            root.classList.add(`${nextResolved}-theme`);
            root.style.colorScheme = nextResolved;
            
            localStorage.setItem('theme', theme);
        };

        updateTheme();

        if (theme === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const listener = () => updateTheme();
            mediaQuery.addEventListener('change', listener);
            return () => mediaQuery.removeEventListener('change', listener);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
