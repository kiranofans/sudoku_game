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

    const [hasHydrated, setHasHydrated] = useState(false);
    useEffect(() => {
        // 1. Run ONCE on mount to sync with browser storage
        if (!hasHydrated) {
            const saved = localStorage.getItem('theme') as Theme;
            if (saved) setTheme(saved);
            setHasHydrated(true);
            return;
        }

        const root = window.document.documentElement;
        // 2. Check storage ONLY once the component mounts in the browser
        const saved = localStorage.getItem('theme') as Theme;
        if (saved && saved !== theme) {
            setTheme(saved);
            return; // Let the next effect run handle the update
        }

        const updateTheme = () => {
            let nextResolved: 'light' | 'dark';
            if (theme === 'system') {
                // This is now safe because it is inside useEffect
                nextResolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            } else {
                nextResolved = theme as 'light' | 'dark';
            }

            setResolvedTheme(nextResolved);
            root.classList.remove('light-theme', 'dark-theme');
            root.classList.add(`${nextResolved}-theme`);
            root.style.colorScheme = nextResolved;
        };

        updateTheme();
        localStorage.setItem('theme', theme);

        if (theme === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const listener = () => updateTheme();
            mediaQuery.addEventListener('change', listener);
            return () => mediaQuery.removeEventListener('change', listener);
        }
    }, [theme, hasHydrated]);

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
