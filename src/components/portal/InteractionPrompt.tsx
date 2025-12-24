"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useCallback } from "react";

interface InteractionPromptProps {
    isNear: boolean;
    missionName: string;
    missionColor: string;
    onInteract: () => void;
}

export default function InteractionPrompt({
    isNear,
    missionName,
    missionColor,
    onInteract,
}: InteractionPromptProps) {
    // Listen for 'E' key press
    const handleKeyPress = useCallback(
        (e: KeyboardEvent) => {
            if ((e.key === "e" || e.key === "E") && isNear) {
                onInteract();
            }
        },
        [isNear, onInteract]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [handleKeyPress]);

    return (
        <AnimatePresence>
            {isNear && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.8 }}
                    transition={{ type: "spring", damping: 15, stiffness: 300 }}
                    className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
                >
                    {/* Comic book panel */}
                    <div className="relative">
                        {/* Main panel */}
                        <div
                            className="relative bg-[#F5E6D3] border-[6px] border-black rounded-lg p-6 md:p-8"
                            style={{
                                boxShadow: "8px 8px 0px rgba(0, 0, 0, 0.8)",
                            }}
                        >
                            {/* Halftone background pattern */}
                            <div
                                className="absolute inset-0 opacity-10 rounded"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(circle, #000 1px, transparent 1px)",
                                    backgroundSize: "6px 6px",
                                }}
                            />

                            {/* Content */}
                            <div className="relative z-10 text-center">
                                {/* Mission name (comic heading) */}
                                <h3
                                    className="font-bangers text-3xl md:text-4xl mb-4 uppercase tracking-wide"
                                    style={{
                                        color: missionColor,
                                        textShadow: "3px 3px 0px rgba(0, 0, 0, 0.8)",
                                    }}
                                >
                                    {missionName}
                                </h3>

                                {/* Interaction prompt */}
                                <div className="inline-block bg-[#F5E6D3] border-4 border-black rounded-2xl px-6 py-3 shadow-[4px_4px_0px_rgba(0,0,0,0.8)]">
                                    <p className="font-carlito text-xl md:text-2xl text-gray-900 italic">
                                        Press{" "}
                                        <kbd
                                            className="inline-flex items-center justify-center px-3 py-1 mx-1 text-white font-bold rounded"
                                            style={{ backgroundColor: missionColor }}
                                        >
                                            E
                                        </kbd>{" "}
                                        to Enter!
                                    </p>
                                </div>

                                {/* Pulsing arrow indicator */}
                                <motion.div
                                    className="mt-4"
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                                >
                                    <span className="text-3xl">👆</span>
                                </motion.div>
                            </div>
                        </div>

                        {/* Speech bubble tail */}
                        <div
                            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                            style={{
                                width: 0,
                                height: 0,
                                borderLeft: "15px solid transparent",
                                borderRight: "15px solid transparent",
                                borderTop: "15px solid black",
                            }}
                        />
                        <div
                            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                            style={{
                                width: 0,
                                height: 0,
                                borderLeft: "12px solid transparent",
                                borderRight: "12px solid transparent",
                                borderTop: "12px solid #F5E6D3",
                            }}
                        />

                        {/* Action lines (comic effect) */}
                        <svg
                            className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none"
                            style={{ zIndex: -1 }}
                        >
                            <line
                                x1="0"
                                y1="50%"
                                x2="20"
                                y2="50%"
                                stroke={missionColor}
                                strokeWidth="3"
                                opacity="0.5"
                            />
                            <line
                                x1="100%"
                                y1="50%"
                                x2="calc(100% - 20px)"
                                y2="50%"
                                stroke={missionColor}
                                strokeWidth="3"
                                opacity="0.5"
                            />
                        </svg>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
