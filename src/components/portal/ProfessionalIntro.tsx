"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface StoryBeat {
    text: string;
    subtext?: string;
    duration: number;
}

const story: StoryBeat[] = [
    {
        text: "Welcome to the Builder's Realm",
        subtext: "An interactive experience by Kishan Goli",
        duration: 3000,
    },
    {
        text: "Where code meets creativity",
        subtext: "Explore projects through immersive challenges",
        duration: 3000,
    },
    {
        text: "Ready to begin?",
        subtext: "Use WASD to move, E to interact",
        duration: 2500,
    },
];

interface ProfessionalIntroProps {
    onComplete: () => void;
}

export default function ProfessionalIntro({ onComplete }: ProfessionalIntroProps) {
    const [currentBeat, setCurrentBeat] = useState(0);
    const [showNinja, setShowNinja] = useState(false);

    const handleComplete = useCallback(() => {
        onComplete();
    }, [onComplete]);

    const handleSkip = useCallback(() => {
        setCurrentBeat(story.length);
        handleComplete();
    }, [handleComplete]);

    useEffect(() => {
        const ninjaTimer = setTimeout(() => setShowNinja(true), 500);
        return () => clearTimeout(ninjaTimer);
    }, []);

    useEffect(() => {
        if (currentBeat < story.length) {
            const timer = setTimeout(() => {
                setCurrentBeat((prev) => prev + 1);
            }, story[currentBeat].duration);
            return () => clearTimeout(timer);
        } else {
            const completeTimer = setTimeout(handleComplete, 1000);
            return () => clearTimeout(completeTimer);
        }
    }, [currentBeat, handleComplete]);

    return (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-[#0A0A0F] via-[#1A1A24] to-[#0A0A0F]">
            {/* Subtle grid background */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(0, 212, 170, 0.03) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                }}
            />

            {/* Animated grid lines */}
            <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 10 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-px bg-gradient-to-r from-transparent via-accent-primary to-transparent opacity-10"
                        style={{ top: `${i * 10}%`, width: "100%" }}
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                            duration: 15 + i * 2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            <div className="relative h-full flex items-center justify-center">
                {/* Ninja character area */}
                <AnimatePresence>
                    {showNinja && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute top-1/4 left-1/2 transform -translate-x-1/2"
                        >
                            {/* Custom Ninja Character Image */}
                            <div className="relative w-48 h-48 md:w-64 md:h-64">
                                <Image
                                    src="/images/ninja-character.png"
                                    alt="Code Ninja"
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    priority
                                />
                                {/* Cyan glow behind character */}
                                <div className="absolute inset-0 blur-3xl bg-accent-primary opacity-30 -z-10 scale-125" />
                            </div>

                            {/* Label */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-6 text-center"
                            >
                                <div className="inline-block px-6 py-2 rounded-full border border-accent-primary/30 bg-[#1A1A24]/50 backdrop-blur">
                                    <span className="font-carlito text-accent-primary font-semibold text-sm">
                                        YOUR DIGITAL GUIDE
                                    </span>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Text content */}
                <div className="absolute bottom-1/4 left-0 right-0 px-8">
                    <AnimatePresence mode="wait">
                        {currentBeat < story.length && (
                            <motion.div
                                key={currentBeat}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6 }}
                                className="text-center"
                            >
                                {/* Main text */}
                                <h2
                                    className="font-bangers text-4xl md:text-6xl mb-4 uppercase tracking-wide"
                                    style={{
                                        background: "linear-gradient(135deg, #00D4AA 0%, #00FFC8 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    {story[currentBeat].text}
                                </h2>

                                {/* Accent line */}
                                <div
                                    className="w-32 mx-auto mb-4"
                                    style={{
                                        height: "2px",
                                        background: "linear-gradient(90deg, transparent, #00D4AA, transparent)",
                                        boxShadow: "0 0 10px rgba(0, 212, 170, 0.5)",
                                    }}
                                />

                                {/* Subtext */}
                                {story[currentBeat].subtext && (
                                    <p className="font-carlito text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
                                        {story[currentBeat].subtext}
                                    </p>
                                )}

                                {/* Progress indicators */}
                                <div className="flex justify-center gap-2 mt-8">
                                    {story.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`h-1 rounded-full transition-all duration-300 ${index === currentBeat
                                                ? "w-12 bg-accent-primary"
                                                : index < currentBeat
                                                    ? "w-8 bg-accent-primary/50"
                                                    : "w-8 bg-gray-700"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Skip button */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    onClick={handleSkip}
                    className="absolute top-8 right-8 px-4 py-2 rounded-lg border border-gray-700 hover:border-accent-primary transition-colors group"
                >
                    <span className="font-carlito font-medium text-gray-400 group-hover:text-accent-primary transition-colors">
                        Skip Introduction →
                    </span>
                </motion.button>
            </div>
        </div>
    );
}
