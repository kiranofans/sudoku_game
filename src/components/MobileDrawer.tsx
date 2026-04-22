import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] md:hidden portrait:block">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="absolute left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 shadow-2xl flex flex-col p-6 animate-in slide-in-from-left duration-300">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <img src="/images/png/logo_sudoku1.png" alt="Logo" className="w-8 h-8 rounded-lg" />
            <span className="font-bold text-xl dark:text-white">Sudoku</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full dark:text-gray-400"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-4 text-lg font-medium">
          <Link
            to="/"
            className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-200"
            onClick={onClose}
          >
            Play Game
          </Link>
          <Link
            to="/sudokuTips"
            className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-200"
            onClick={onClose}
          >
            Tips
          </Link>
          <Link
            to="/faq"
            className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-200"
            onClick={onClose}
          >
            FAQ
          </Link>
          <Link
            to="/about"
            className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-200"
            onClick={onClose}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-200"
            onClick={onClose}
          >
            Contact
          </Link>

          <Link
            to="/changeLog"
            className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 
            dark:text-gray-200"
            onClick={onClose}
          >
            What's New?
          </Link>
        </nav>

        <div className="mt-auto pt-8 border-t dark:border-gray-800 text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} sudokuplays.com
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
