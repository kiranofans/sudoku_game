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
            "1. Advertising is currently disabled due to technical updates.",
            "2. iOS responsive UI may still have some issues."
        ]
    }
];