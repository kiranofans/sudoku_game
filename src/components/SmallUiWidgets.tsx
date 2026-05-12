import { changelog } from "@/hooks/useChangeLog";
import React from "react";

import ExpandableBox from "./ExpandableBox";

/**
 * Small UI Widgets Collection
 * A grouped set of reusable UI components
 */
export const SmallUiWidgets = {
    ChangelogEntry, KnownIssuesBox, Timeline
};

function Timeline({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative border-l border-gray-300 
        dark:border-gray-700 pl-6 space-y-10">
            {children}
        </div>
    );
}

/* =========================
   TYPES
========================= */

type ChangelogEntryProps = {
    date: string;
    version: string;
    title: string;
    items: React.ReactNode[];
    color?: string;
};

/* =========================
   COMPONENT: ChangelogEntry
========================= */

function ChangelogEntry({
    date,
    version,
    title,
    items,
    color = "bg-gray-400 dark:bg-gray-300",

}: ChangelogEntryProps) {
    return (

        <div className="relative">
            {/* Dot */}
            <div
                className={`absolute -left-[20px] top-1 w-3 h-3 rounded-full ${color}`}
            />

            {/* Date */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {date} • Version {version}
            </p>

            {/* Card */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-6">
                <div>
                    <h3 className="text-lg font-semibold dark:text-white mb-2">
                        {title}
                    </h3>

                    <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                        {items.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

/* =========================
   COMPONENT: UnorderedListUI
========================= */
type ListItem = {
    content: React.ReactNode;
    subItems?: ListItem[]; // Recursive definition
};

type ListUiProps = {
    items: ListItem[];
    subSectionTitle?: string;
    supplementalText?: string;
    isOrdered?: boolean;
};

export function ListUi({ items, subSectionTitle, supplementalText,
    isOrdered = false }: ListUiProps) {
    const Tag = isOrdered ? 'ol' : 'ul';
    const listStyle = isOrdered ? 'md:list-decimal' : "md:list-disc";

    return (
        <Tag className={`${listStyle} space-y-2 text-gray-700 dark:text-gray-300 text-sm`}>
            {items.map((item, idx) => (
                <li key={idx} className="mb-4">

                    {subSectionTitle && (
                        <p className="mb-1 font-bold">{subSectionTitle}</p>
                    )}

                    {supplementalText && (
                        <p className="mb-1 font-bold">{supplementalText}</p>
                    )}

                    {/* Main content */}
                    <div>{item.content}</div>

                    {/* Nested list */}
                    {item.subItems && item.subItems.length > 0 && (
                        <div className="mt-1 ml-4">
                            <ListUi items={item.subItems} />
                        </div>
                    )}
                </li>
            ))}
        </Tag>
    );
}


type KnownIssuesBoxProps = {
    items: React.ReactNode[];
    isOnHomePage?: boolean;
    defaultOpen?: boolean;
    bgColor?: string;
};

export function getLatestKnownIssues() {
    const latest = changelog.find(
        (c) => c.showKnownIssuesBox && c.knownIssues?.length
    );
    return latest?.knownIssues ?? [];
}

function KnownIssuesBox({
    items,
    isOnHomePage: initialIsOnHomePage = false,
    defaultOpen = false,
    bgColor = "bg-yellow-50 dark:bg-yellow-200"
}: KnownIssuesBoxProps) {
    const [isOnHomePage, setIsOnHomePage] = React.useState(initialIsOnHomePage);
    const [isOpen, setIsOpen] = React.useState(defaultOpen);


    React.useEffect(() => {
        setIsOnHomePage(window.location.pathname === "/" || window.location.pathname === "/sudoku_game/");
    }, []);

    if (!items.length) return null;

    const onWherePlaced = isOnHomePage ? "game-only-issues mt-auto" : "";

    return (
        /* Container div*/
        <div data-nosnippet className={`${onWherePlaced} w-full mx-auto px-2 pb-2 text-md text-gray-600 mt-4 mb-0.5 mx-2 known-issues-container`}>
            <div className=" max-w-[800px] mx-auto " style={{ width: '100%', maxWidth: '900px', textAlign: 'left', flex: '1 0 auto' }}>
                <ExpandableBox
                    title={
                        <span className="flex items-center font-bold text-yellow-900 dark:text-yellow-900">
                            <span className="mr-1">⚠️</span>
                            <span className="line-clamp-1">Known Issues</span>
                        </span>
                    }
                    isOpen={isOpen}
                    onToggle={() => setIsOpen(!isOpen)}
                    bgColor={`${bgColor} border-yellow-200 dark:border-yellow-900/50`}
                >
                    <ol className="pl-0 space-y-1 text-yellow-900 dark:text-yellow-100">
                        {items.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ol>
                </ExpandableBox>
            </div>
        </div>
    );
}