const HINTS_KEY = 'sudoku_hints_state';
const RESET_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface HintsState {
    count: number;
    lastResetTimestamp: number;
}

export const loadPersistedHints = (): number => {
    try {
        const stored = localStorage.getItem(HINTS_KEY);
        if (!stored) {
            return resetHints();
        }

        const state: HintsState = JSON.parse(stored);
        const now = Date.now();

        if (now - state.lastResetTimestamp > RESET_DURATION) {
            return resetHints();
        }

        return state.count;
    } catch (error) {
        console.error('Failed to load hints from persistence:', error);
        return 3; // Default fallback
    }
};

export const savePersistedHints = (count: number) => {
    try {
        const stored = localStorage.getItem(HINTS_KEY);
        let lastResetTimestamp = Date.now();

        if (stored) {
            const state: HintsState = JSON.parse(stored);
            lastResetTimestamp = state.lastResetTimestamp;
        }

        const newState: HintsState = {
            count,
            lastResetTimestamp
        };
        localStorage.setItem(HINTS_KEY, JSON.stringify(newState));
    } catch (error) {
        console.error('Failed to save hints to persistence:', error);
    }
};

const resetHints = (): number => {
    const initialState: HintsState = {
        count: 3,
        lastResetTimestamp: Date.now()
    };
    localStorage.setItem(HINTS_KEY, JSON.stringify(initialState));
    return 3;
};
