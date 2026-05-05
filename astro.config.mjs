import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// This checks if the build is running on GitHub Actions
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

// https://astro.build/config
export default defineConfig({
    // 1. Set this for the final domain
    site: 'https://sudokuplays.com',
    // 2. Set your repo name (e.g., '/sudoku_game') for Github testing
    base: isGitHubActions ? '/sudoku_game' : '/',
    integrations: [react(), tailwind()],
    build: {
        assets: 'assets',
    },
    vite: {
        plugins: [tailwindcss()],
        resolve: {
            alias: {
                '@': path.resolve('./src'),
            },
        },
    },
});