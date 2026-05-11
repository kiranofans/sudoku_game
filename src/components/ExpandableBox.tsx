import React from "react";

interface ExpandableBoxProps {
    title: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
    bgColor?: string;
}

const ExpandableBox: React.FC<ExpandableBoxProps> = ({
    title,
    isOpen,
    onToggle,
    children,
    bgColor = "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600",
}) => {
    return (
        /* The main container/box */
        <div className={`w-full border ${bgColor} rounded overflow-hidden transition-all duration-300`}>

            {/* Toggle bar */}
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center px-4 py-2.5 
               !border-none !rounded-none !bg-transparent
               hover:bg-gray-50 dark:hover:bg-gray-600
               transition-colors focus:outline-none"
            >
                <span className="text-[13px] text-gray-700 dark:text-gray-300 tracking-wider font-semibold text-left">
                    {title}
                </span>
                <span className="text-gray-500 dark:text-gray-200 font-bold text-lg leading-none">
                    {isOpen ? "−" : "+"}
                </span>
            </button>

            {/* Expanded content */}
            {isOpen && (
                <div className="px-4 py-4 text-left border-t border-gray-200 w-full 
                    dark:border-gray-700 text-sm text-gray-600 dark:text-gray-100">
                    <div className="max-w-2xl w-full mx-auto break-words whitespace-normal">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpandableBox;
