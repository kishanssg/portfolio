"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useCallback } from "react";
import { ChevronRight } from "lucide-react";

interface ProfessionalInteractionProps {
    isNear: boolean;
    missionName: string;
    missionDescription: string;
    missionColor: string;
    missionIcon: React.ReactNode;
    onInteract: () => void;
}

export default function ProfessionalInteraction({
    isNear,
    missionName,
    missionDescription,
    missionColor,
    missionIcon,
    onInteract,
}: ProfessionalInteractionProps) {
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
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50"
                >
                    <div
                        className="p-6 max-w-md backdrop-blur-xl rounded-xl"
                        style={{
                            background: "linear-gradient(135deg, rgba(26, 26, 36, 0.95) 0%, rgba(21, 21, 32, 0.95) 100%)",
                            border: "1px solid rgba(42, 42, 53, 0.8)",
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                        }}
                    >
                        {/* Top glow line */}
                        <div
                            className="absolute top-0 left-0 right-0 h-px"
                            style={{
                                background: `linear-gradient(90deg, transparent, ${missionColor}40, transparent)`,
                            }}
                        />

                        {/* Mission indicator */}
                        <div className="flex items-start gap-4 mb-4">
                            {/* Icon */}
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{
                                    backgroundColor: `${missionColor}15`,
                                    border: `1px solid ${missionColor}40`,
                                }}
                            >
                                <div style={{ color: missionColor }}>{missionIcon}</div>
                            </div>

                            {/* Text */}
                            <div className="flex-1">
                                <h3
                                    className="font-bangers text-xl mb-1 uppercase tracking-wide"
                                    style={{
                                        background: `linear-gradient(135deg, ${missionColor}, ${missionColor}80)`,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    {missionName}
                                </h3>
                                <p className="font-carlito text-sm text-gray-400">
                                    {missionDescription}
                                </p>
                            </div>
                        </div>

                        {/* Accent line */}
                        <div
                            className="mb-4 h-px"
                            style={{
                                background: `linear-gradient(90deg, transparent, ${missionColor}50, transparent)`,
                            }}
                        />

                        {/* Interaction button */}
                        <motion.button
                            onClick={onInteract}
                            className="w-full group relative overflow-hidden rounded-lg p-3 border transition-all"
                            style={{
                                borderColor: `${missionColor}60`,
                                backgroundColor: `${missionColor}10`,
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Animated background on hover */}
                            <motion.div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ backgroundColor: `${missionColor}20` }}
                            />

                            {/* Button content */}
                            <div className="relative z-10 flex items-center justify-between">
                                <span className="font-carlito font-semibold text-gray-200 group-hover:text-white transition-colors">
                                    Press{" "}
                                    <kbd
                                        className="px-2 py-1 mx-1 rounded text-sm font-mono"
                                        style={{ backgroundColor: `${missionColor}30`, color: missionColor }}
                                    >
                                        E
                                    </kbd>{" "}
                                    to Enter
                                </span>
                                <ChevronRight
                                    className="w-5 h-5 text-gray-400 group-hover:translate-x-1 group-hover:text-white transition-all"
                                />
                            </div>
                        </motion.button>

                        {/* Pulsing indicator */}
                        <motion.div
                            className="absolute -top-2 left-1/2 transform -translate-x-1/2"
                            animate={{ y: [-3, 0, -3] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{
                                    backgroundColor: missionColor,
                                    boxShadow: `0 0 12px ${missionColor}`,
                                }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
