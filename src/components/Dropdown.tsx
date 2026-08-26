import React, { useState, useRef, ReactNode } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';

interface DropdownProps {
    trigger?: ReactNode;
    children: ReactNode;
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
    trigger,
    children,
    className = "",
    isOpen: controlledIsOpen,
    onClose: controlledOnClose,
}) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

    const toggle = () => {
        if (!isControlled) {
            setInternalIsOpen(!isOpen);
        }
    };

    const close = () => {
        if (isControlled) {
            controlledOnClose?.();
        } else {
            setInternalIsOpen(false);
        }
    };

    useClickOutside(dropdownRef, close);

    return (
        <div className={`theme-selector-container ${className}`} ref={dropdownRef}>
            {trigger && (
                <div onClick={toggle} className="dropdown-trigger">
                    {trigger}
                </div>
            )}
            {isOpen && (
                <div className="theme-dropdown-menu" onClick={close}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
