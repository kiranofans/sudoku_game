const STORAGE_KEY = 'sudoku_app_persistence_state';
const RESET_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface PersistenceState {
    hints: number;
    score: number | null;
    lastResetTimestamp: number;
}

const DEFAULT_STATE: PersistenceState = {
    hints: 3,
    score: null,
    lastResetTimestamp: Date.now()
};

const getPersistedState = (): PersistenceState => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            return resetPersistence();
        }

        const state: PersistenceState = JSON.parse(stored);
        const now = Date.now();

        if (now - state.lastResetTimestamp > RESET_DURATION) {
            return resetPersistence();
        }

        return state;
    } catch (error) {
        console.error('Failed to load persistence state:', error);
        return DEFAULT_STATE;
    }
};

const savePersistedState = (state: PersistenceState) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        console.error('Failed to save persistence state:', error);
    }
};

const resetPersistence = (): PersistenceState => {
    const newState: PersistenceState = {
        ...DEFAULT_STATE,
        lastResetTimestamp: Date.now()
    };
    savePersistedState(newState);
    return newState;
};

export const loadPersistedHints = (): number => {
    return getPersistedState().hints;
};

export const loadPersistedScore = (): number | null => {
    return getPersistedState().score;
};

export const savePersistedHints = (hints: number) => {
    const state = getPersistedState();
    savePersistedState({ ...state, hints });
};

export const savePersistedScore = (score: number | null) => {
    const state = getPersistedState();
    savePersistedState({ ...state, score });
};
