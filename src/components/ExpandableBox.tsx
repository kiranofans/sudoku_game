import React from "react";

interface ExpandableBoxProps {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}

const ExpandableBox: React.FC<ExpandableBoxProps> = ({
    title,
    isOpen,
    onToggle,
    children,
}) => {
    return (
        /* The main container/box: Background for the ENTIRE thing */
        <div className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded">
            {/* The clickable bar: "bg-transparent" makes it use the box background above */}
            <button
                onClick={onToggle}
                className="w-full bg-transparent flex justify-between items-center px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none"
            >
                {/* The title text */}
                <span className={`text-[13px] text-gray-700 dark:text-gray-400 tracking-wider font-semibold text-left`}>
                    {title}
                </span>

                {/* The +/- expand/collapse indicator */}
                <span className="text-gray-500 dark:text-gray-500 font-bold text-lg leading-none">
                    {isOpen ? "−" : "+"}
                </span>
            </button>

            {/* The expanded content area */}
            {isOpen && (
                <div className="px-4 pb-4 pt-2 text-left border-t border-gray-200 w-full dark:border-gray-700 text-sm text-gray-600 dark:text-gray-100 break-words">
                    <div className="max-w-2xl w-full mx-auto">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpandableBox;
