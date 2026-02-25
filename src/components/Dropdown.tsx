import React, { useState, useRef, ReactNode } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';

interface DropdownProps {
    trigger: ReactNode;
    children: ReactNode;
    className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
    trigger,
    children,
    className = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggle = () => setIsOpen(!isOpen);
    const close = () => setIsOpen(false);

    useClickOutside(dropdownRef, close);

    return (
        <div className={`theme-selector-container ${className}`} ref={dropdownRef}>
            <div onClick={toggle} className="dropdown-trigger">
                {trigger}
            </div>
            {isOpen && (
                <div className="theme-dropdown-menu" onClick={close}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
