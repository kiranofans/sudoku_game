import React from 'react';
import { ThemeProvider } from './ThemeContext';
import Layout from './Layout';

interface MainWrapperProps {
    children: React.ReactNode;
    title?: string;
    mobileScore?: React.ReactNode;
    headerContent?: React.ReactNode;
}

export default function MainWrapper({ children, mobileScore, headerContent }: MainWrapperProps) {
    return (
        <ThemeProvider>
            <Layout mobileScore={mobileScore} headerContent={headerContent}>
                {children}
            </Layout>
        </ThemeProvider>
    );
}