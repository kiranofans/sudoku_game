export type ChangelogEntry = {
    version: string;
    date: string;
    showKnownIssuesBox?: boolean;
    knownIssues: string[];
};
export const changelog = [
    {
        version: "1.0.0",
        date: "2026-04-14",
        showKnownIssuesBox: true,
        knownIssues: [
            "Advertising is currently disabled due to technical updates.",
            "Found a bug in the remaining-number counter: incorrect inputs were being counted as valid entries, which caused the remaining counts for digits 1–9 to be miscalculated during gameplay.",
            "Scoring system miscalculates the score due to a previous timer bug."
        ]
    }
];