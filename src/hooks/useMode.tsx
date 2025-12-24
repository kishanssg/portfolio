"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Mode } from "@/lib/types";

interface ModeContextType {
    mode: Mode;
    toggleMode: () => void;
    setMode: (mode: Mode) => void;
    isPortal: boolean;
    isTransitioning: boolean;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

interface ModeProviderProps {
    children: ReactNode;
}

export function ModeProvider({ children }: ModeProviderProps) {
    const [mode, setModeState] = useState<Mode>("professional");
    const [isTransitioning, setIsTransitioning] = useState(false);

    const toggleMode = useCallback(() => {
        // Prevent multiple transitions
        if (isTransitioning) return;

        setIsTransitioning(true);

        // Transition duration matches cloud animation (2s)
        setTimeout(() => {
            setModeState((prev) => (prev === "professional" ? "portal" : "professional"));
            // Small delay before ending transition for smooth rendering
            setTimeout(() => setIsTransitioning(false), 100);
        }, 2000);
    }, [isTransitioning]);

    const setMode = useCallback((newMode: Mode) => {
        if (isTransitioning) return;
        setModeState(newMode);
    }, [isTransitioning]);

    const isPortal = mode === "portal";

    return (
        <ModeContext.Provider
            value={{ mode, toggleMode, setMode, isPortal, isTransitioning }}
        >
            {children}
        </ModeContext.Provider>
    );
}

export function useMode() {
    const context = useContext(ModeContext);
    if (context === undefined) {
        throw new Error("useMode must be used within a ModeProvider");
    }
    return context;
}
