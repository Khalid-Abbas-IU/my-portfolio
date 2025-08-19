"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { TooltipProvider } from "@radix-ui/react-tooltip";

// Dynamic import with NO SSR - CORRECT PATH
const AdvancedPortfolio = dynamic(
    () => import("../components/portfolio/advanced-portfolio"),
    {
        ssr: false,
        loading: () => null // No loading component to avoid hydration issues
    }
);

// Loading component for better UX
function PortfolioLoading() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                {/* 3D Loading Animation */}
                <div className="relative mb-6">
                    <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <div
                        className="absolute inset-0 w-16 h-16 border-4 border-pink-600 border-b-transparent rounded-full animate-spin mx-auto"
                        style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
                    />
                </div>

                {/* Loading Text */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Loading Portfolio
                    </h2>
                    <p className="text-gray-400">Initializing 3D experience...</p>
                </div>

                {/* Progress Bar */}
                <div className="w-64 h-1 bg-gray-800 rounded-full mx-auto mt-4 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}

export default function Page() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Show loading during SSR and initial client render
    if (!isMounted) {
        return <PortfolioLoading />;
    }

    // Only render after client-side hydration
    return (
        <TooltipProvider>
            <AdvancedPortfolio />
        </TooltipProvider>
    );
}