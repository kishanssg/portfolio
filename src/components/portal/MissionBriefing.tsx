"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { AlertCircle, Trophy, Clock, X } from "lucide-react";

interface MissionBriefingProps {
    missionId: string;
    onStart: () => void;
    onAbort: () => void;
}

const missionBriefings = {
    "debug-code": {
        title: "Mission: Debug The Code",
        objective: "Find and fix all bugs in the code snippet",
        rules: [
            "You have 60 seconds per challenge",
            "Click on the buggy lines to identify them",
            "Each correct identification: +10 points",
            "Wrong identification: -5 points",
        ],
        tips: [
            "Look for syntax errors first",
            "Check variable declarations",
            "Watch for logic issues",
        ],
        reward: "🏆 Debug Master Badge",
    },
    "speed-typing": {
        title: "Mission: Speed Typing Challenge",
        objective: "Type code snippets as fast and accurately as possible",
        rules: [
            "Type the exact code shown on screen",
            "Accuracy matters - typos reduce your score",
            "Complete 5 snippets to finish",
            "Beat 60 WPM to earn bonus points",
        ],
        tips: [
            "Focus on accuracy first, speed second",
            "Use proper finger placement",
            "Don't look at the keyboard",
        ],
        reward: "⚡ Speed Demon Badge",
    },
    "system-design": {
        title: "Mission: System Design Builder",
        objective: "Design a scalable system architecture",
        rules: [
            "Drag components onto the canvas",
            "Connect them with data flow arrows",
            "Must include: Load Balancer, Database, Cache",
            "System must handle 1M+ requests/day",
        ],
        tips: [
            "Think about single points of failure",
            "Consider caching strategies",
            "Plan for horizontal scaling",
        ],
        reward: "🏗️ Architect Badge",
    },
    "bug-hunt": {
        title: "Mission: Bug Hunt 3D",
        objective: "Find all hidden bugs in the 3D environment",
        rules: [
            "You have 90 seconds",
            "10 bugs are hidden in the scene",
            "Click bugs to capture them",
            "Each bug reveals a fun fact about Kishan",
        ],
        tips: [
            "Look in corners and behind objects",
            "Bugs might be moving",
            "Use mouse to rotate the view",
        ],
        reward: "🎯 Bug Hunter Badge",
    },
};

export default function MissionBriefing({
    missionId,
    onStart,
    onAbort,
}: MissionBriefingProps) {
    const [countdown, setCountdown] = useState<number | null>(null);
    const briefing =
        missionBriefings[missionId as keyof typeof missionBriefings];

    // Handle escape key to abort
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onAbort();
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [onAbort]);

    // Countdown timer
    useEffect(() => {
        if (countdown !== null && countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0) {
            onStart();
        }
    }, [countdown, onStart]);

    const startCountdown = useCallback(() => {
        setCountdown(3);
    }, []);

    if (!briefing) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-3xl w-full relative py-8"
            >
                {/* Close button */}
                <button
                    onClick={onAbort}
                    className="absolute -top-2 right-0 text-gray-400 hover:text-white transition-colors z-10"
                    aria-label="Abort mission"
                >
                    <X className="w-8 h-8" />
                </button>

                {/* Ninja character */}
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-6"
                >
                    <div className="text-6xl md:text-8xl mb-2">🥷</div>
                    <p className="text-accent-primary font-bold text-sm md:text-base">
                        Code Ninja says:
                    </p>
                </motion.div>

                {/* Briefing card */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gray-900 border-2 border-accent-primary rounded-2xl p-6 md:p-8"
                >
                    {/* Title */}
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6 text-center">
                        {briefing.title}
                    </h2>

                    {/* Objective */}
                    <div className="mb-4 md:mb-6 p-3 md:p-4 bg-accent-primary/10 border border-accent-primary/30 rounded-lg">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-accent-primary flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-bold text-white mb-1 text-sm md:text-base">
                                    Objective:
                                </h3>
                                <p className="text-gray-300 text-sm md:text-base">
                                    {briefing.objective}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Rules */}
                    <div className="mb-4 md:mb-6">
                        <h3 className="font-bold text-white mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                            <Clock className="w-4 h-4 md:w-5 md:h-5 text-accent-secondary" />
                            Rules:
                        </h3>
                        <ul className="space-y-1.5 md:space-y-2">
                            {briefing.rules.map((rule, index) => (
                                <li
                                    key={index}
                                    className="text-gray-300 flex items-start gap-2 text-sm md:text-base"
                                >
                                    <span className="text-accent-primary">▸</span>
                                    {rule}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tips */}
                    <div className="mb-4 md:mb-6">
                        <h3 className="font-bold text-white mb-2 md:mb-3 text-sm md:text-base">
                            💡 Pro Tips:
                        </h3>
                        <ul className="space-y-1.5 md:space-y-2">
                            {briefing.tips.map((tip, index) => (
                                <li
                                    key={index}
                                    className="text-gray-400 text-xs md:text-sm flex items-start gap-2"
                                >
                                    <span className="text-yellow-400">★</span>
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Reward */}
                    <div className="mb-6 md:mb-8 p-3 md:p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Trophy className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                            <div>
                                <h3 className="font-bold text-white mb-0.5 text-sm md:text-base">
                                    Completion Reward:
                                </h3>
                                <p className="text-yellow-400 text-sm md:text-base">
                                    {briefing.reward}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Start button or countdown */}
                    <AnimatePresence mode="wait">
                        {countdown === null ? (
                            <motion.button
                                key="start-button"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={startCountdown}
                                className="w-full py-3 md:py-4 bg-accent-primary text-black font-bold text-lg md:text-xl rounded-lg hover:brightness-110 transition-all"
                            >
                                Start Mission →
                            </motion.button>
                        ) : (
                            <motion.div
                                key="countdown"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="text-center"
                            >
                                <motion.div
                                    key={countdown}
                                    initial={{ scale: 1.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-6xl md:text-8xl font-bold text-accent-primary mb-2 md:mb-4"
                                >
                                    {countdown}
                                </motion.div>
                                <p className="text-gray-400 text-sm md:text-base">
                                    Mission starting...
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Footer note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center text-gray-500 text-xs md:text-sm mt-4"
                >
                    Press ESC or click ✕ to abort mission
                </motion.p>
            </motion.div>
        </div>
    );
}
