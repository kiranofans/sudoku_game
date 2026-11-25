import { afterEach, describe, expect, it, vi } from 'vitest';
import { trackGA4Event } from './analytics';

const originalGtag = window.gtag;

afterEach(() => {
    if (originalGtag) {
        window.gtag = originalGtag;
    } else {
        delete window.gtag;
    }
    vi.restoreAllMocks();
});

describe('trackGA4Event', () => {
    it('sends the event name and parameters to Google Analytics', () => {
        const gtag = vi.fn();
        window.gtag = gtag;

        trackGA4Event('game_board_cell_select', { game_mode: 'sudoku' });

        expect(gtag).toHaveBeenCalledWith(
            'event',
            'game_board_cell_select',
            { game_mode: 'sudoku' },
        );
    });

    it('does nothing when the Google tag is unavailable', () => {
        delete window.gtag;

        expect(() => trackGA4Event('quick_guide_open')).not.toThrow();
    });
});
