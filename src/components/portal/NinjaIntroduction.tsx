"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

interface ComicPanel {
    text: string;
    action?: string;
    duration: number;
}

const introStory: ComicPanel[] = [
    {
        text: "IN THE NOT SO DISTANT FUTURE...",
        duration: 2000,
    },
    {
        text: "A legendary CODE NINJA guards the digital realm...",
        action: "WHOOSH!",
        duration: 2500,
    },
    {
        text: "Kishan has programmed me to test worthy builders!",
        duration: 3000,
    },
    {
        text: "Are you ready to prove your skills?",
        action: "CHALLENGE!",
        duration: 2500,
    },
    {
        text: "Explore the realm and choose your mission!",
        action: "GO!",
        duration: 2000,
    },
];

interface NinjaIntroductionProps {
    onComplete: () => void;
}

export default function NinjaIntroduction({ onComplete }: NinjaIntroductionProps) {
    const [currentPanel, setCurrentPanel] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    const handleComplete = useCallback(() => {
        setIsComplete(true);
        onComplete();
    }, [onComplete]);

    const handleSkip = useCallback(() => {
        setCurrentPanel(introStory.length);
        handleComplete();
    }, [handleComplete]);

    useEffect(() => {
        if (currentPanel < introStory.length) {
            const timer = setTimeout(() => {
                setCurrentPanel((prev) => prev + 1);
            }, introStory[currentPanel].duration);
            return () => clearTimeout(timer);
        } else if (!isComplete) {
            setTimeout(() => {
                handleComplete();
            }, 800);
        }
    }, [currentPanel, isComplete, handleComplete]);

    if (isComplete) return null;

    return (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-blue-900 via-purple-900 to-black flex items-center justify-center p-4">
            {/* Halftone background */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                    backgroundSize: "8px 8px",
                }}
            />

            {/* Animated stars */}
            <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 50 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: Math.random() * 3 + 1, repeat: Infinity }}
                    />
                ))}
            </div>

            <AnimatePresence mode="wait">
                {currentPanel < introStory.length && (
                    <motion.div
                        key={currentPanel}
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 1.2, rotate: 5 }}
                        transition={{ type: "spring", damping: 20 }}
                        className="relative max-w-4xl mx-auto w-full"
                    >
                        {/* Comic Panel */}
                        <div
                            className="relative p-8 md:p-12"
                            style={{
                                background: "#F5E6D3",
                                border: "6px solid #000",
                                boxShadow: "8px 8px 0px rgba(0, 0, 0, 0.8)",
                            }}
                        >
                            {/* Halftone overlay */}
                            <div
                                className="absolute inset-0 opacity-10 pointer-events-none"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(circle, #000 1px, transparent 1px)",
                                    backgroundSize: "6px 6px",
                                }}
                            />

                            {/* Panel content */}
                            <div className="relative z-10">
                                {/* Ninja character */}
                                <motion.div
                                    initial={{ x: -100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3, type: "spring" }}
                                    className="text-center mb-6 md:mb-8"
                                >
                                    <div className="text-7xl md:text-9xl mb-2 md:mb-4">🥷</div>
                                    <p
                                        className="font-bangers text-xl md:text-2xl uppercase tracking-wide"
                                        style={{
                                            color: "#00D4AA",
                                            textShadow: "2px 2px 0px rgba(0, 0, 0, 0.8)",
                                        }}
                                    >
                                        CODE NINJA
                                    </p>
                                </motion.div>

                                {/* Speech bubble */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="max-w-2xl mx-auto"
                                >
                                    <div
                                        className="relative rounded-2xl p-4 md:p-6"
                                        style={{
                                            background: "#F5E6D3",
                                            border: "4px solid #000",
                                            boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.8)",
                                        }}
                                    >
                                        <p
                                            className="font-carlito text-xl md:text-3xl text-center italic"
                                            style={{ color: "#1a1a1a" }}
                                        >
                                            {introStory[currentPanel].text}
                                        </p>

                                        {/* Speech bubble tail */}
                                        <div
                                            className="absolute -top-5 left-1/2 transform -translate-x-1/2"
                                            style={{
                                                width: 0,
                                                height: 0,
                                                borderLeft: "15px solid transparent",
                                                borderRight: "15px solid transparent",
                                                borderBottom: "15px solid #000",
                                            }}
                                        />
                                        <div
                                            className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                                            style={{
                                                width: 0,
                                                height: 0,
                                                borderLeft: "12px solid transparent",
                                                borderRight: "12px solid transparent",
                                                borderBottom: "12px solid #F5E6D3",
                                            }}
                                        />
                                    </div>
                                </motion.div>

                                {/* Action text (if present) */}
                                {introStory[currentPanel].action && (
                                    <motion.div
                                        initial={{ scale: 0, rotate: -45 }}
                                        animate={{ scale: 1, rotate: -5 }}
                                        transition={{ delay: 0.8, type: "spring", damping: 10 }}
                                        className="absolute -top-4 md:-top-8 -right-2 md:-right-8"
                                    >
                                        <div
                                            className="font-bangers text-3xl md:text-5xl"
                                            style={{
                                                color: "#FFD700",
                                                textShadow: `
                          3px 3px 0px #FF006E,
                          6px 6px 0px rgba(0, 0, 0, 0.8)
                        `,
                                                transform: "rotate(-5deg)",
                                            }}
                                        >
                                            {introStory[currentPanel].action}
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Corner accents */}
                            <div className="absolute -top-3 -left-3 w-6 h-6 bg-black" />
                            <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-black" />
                        </div>

                        {/* Progress indicator (comic style diamonds) */}
                        <div className="flex justify-center gap-3 mt-6">
                            {introStory.map((_, index) => (
                                <motion.div
                                    key={index}
                                    className="w-3 h-3 md:w-4 md:h-4 border-2 md:border-4 border-black"
                                    style={{
                                        backgroundColor:
                                            index <= currentPanel ? "#00D4AA" : "#ffffff",
                                        transform: "rotate(45deg)",
                                        boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.8)",
                                    }}
                                    animate={
                                        index === currentPanel ? { scale: [1, 1.3, 1] } : {}
                                    }
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                />
                            ))}
                        </div>

                        {/* Skip button */}
                        <motion.button
                            onClick={handleSkip}
                            className="absolute top-2 right-2 md:top-4 md:right-4 px-3 py-1 md:px-4 md:py-2 font-bangers uppercase tracking-wide"
                            style={{
                                background: "#ffffff",
                                border: "3px solid #000",
                                boxShadow: "3px 3px 0px rgba(0, 0, 0, 0.8)",
                            }}
                            whileHover={{ scale: 1.1, backgroundColor: "#00D4AA" }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <span className="text-sm md:text-base text-black">SKIP →</span>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
