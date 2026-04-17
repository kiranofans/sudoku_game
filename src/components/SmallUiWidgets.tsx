import { changelog } from "@/hooks/useChangeLog";
import React from "react";

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

type UnorderedListProps = {
    items: ListItem[];
    subSectionTitle?: string;
    supplementalText?: string;
    isOrdered?: boolean;
};

export function UnorderedListUI({ items, subSectionTitle, supplementalText, isOrdered = false }: UnorderedListProps) {
    const Tag = isOrdered ? 'ol' : 'ul';
    const listStyle = isOrdered ? 'md:list-decimal' : "md:list-disc";
    return (
        <div className="mb-4">
            {subSectionTitle && <p className="mb-1 font-bold">{subSectionTitle}</p>}
            {supplementalText && <p className="mb-1 font-bold">{supplementalText}</p>}
            <Tag className={`${listStyle} pl-5 space-y-1 text-gray-700 dark:text-gray-300`}>
                {items.map((item, idx) => (
                    <li key={idx}>
                        {/* Render the current item content */}
                        <div>{item.content}</div>

                        {/* If subItems exist, render another list inside this <li> */}
                        {item.subItems && item.subItems.length > 0 && (
                            <div className="mt-1">
                                <UnorderedListUI items={item.subItems} />
                            </div>
                        )}
                    </li>
                ))}
            </Tag>
        </div>
    );
}

/* =========================
   COMPONENT: KnownIssuesBox
========================= */

type KnownIssuesBoxProps = {
    items: React.ReactNode[];
};

export function getLatestKnownIssues() {
    const latest = changelog.find(
        (c) => c.showKnownIssuesBox && c.knownIssues?.length
    );
    return latest?.knownIssues ?? [];
}

function KnownIssuesBox({ items }: KnownIssuesBoxProps) {
    if (!items.length) return null;
    return (
        <div className="text-md text-gray-600 mt-0.5 mb-0.5 ml-2 mr-2">
            <div className="p-2.5 pb-1.5 pt-1.5 text-left w-full mt-1 mb-3
            mx-auto rounded bg-yellow-50 border border-yellow-200 text-sm text-yellow-800">
                <span className="font-bold">⚠️ Known Issues:</span>
                <ol type="a">
                    {items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                    {/* do not put comma ',' after the big braket 
                    unless there's another list to map */}
                </ol>
            </div>

        </div>
    );
}