"use client";

import { motion } from "framer-motion";
import { Bug, Zap, Building2, Target, Lock, ChevronRight } from "lucide-react";

interface Mission {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    status: "available" | "locked";
    color: string;
    estimatedTime: string;
}

const missions: Mission[] = [
    {
        id: "debug-code",
        name: "Debug The Code",
        description: "Identify and fix bugs in production code",
        icon: <Bug className="w-6 h-6" />,
        difficulty: "Beginner",
        status: "available",
        color: "#00D4AA",
        estimatedTime: "5 min",
    },
    {
        id: "speed-typing",
        name: "Speed Coding",
        description: "Type code snippets with accuracy and speed",
        icon: <Zap className="w-6 h-6" />,
        difficulty: "Intermediate",
        status: "available",
        color: "#00A8FF",
        estimatedTime: "3 min",
    },
    {
        id: "system-design",
        name: "System Architect",
        description: "Design scalable distributed systems",
        icon: <Building2 className="w-6 h-6" />,
        difficulty: "Advanced",
        status: "locked",
        color: "#9D4EDD",
        estimatedTime: "10 min",
    },
    {
        id: "tech-quiz",
        name: "Algorithm Challenge",
        description: "Solve algorithmic problems efficiently",
        icon: <Target className="w-6 h-6" />,
        difficulty: "Advanced",
        status: "locked",
        color: "#FFD60A",
        estimatedTime: "15 min",
    },
];

interface ProfessionalMissionSelectProps {
    onSelect: (missionId: string) => void;
    onExit: () => void;
}

export default function ProfessionalMissionSelect({
    onSelect,
    onExit,
}: ProfessionalMissionSelectProps) {
    return (
        <div className="fixed inset-0 z-40 bg-[#0A0A0F]">
            {/* Subtle grid background */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(0, 212, 170, 0.03) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                }}
            />

            <div className="relative h-full flex flex-col">
                {/* Header */}
                <motion.header
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="p-6 md:p-8 border-b border-gray-800"
                >
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        {/* Title area */}
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center text-3xl md:text-4xl">
                                🥷
                            </div>
                            <div>
                                <h1
                                    className="font-bangers text-2xl md:text-3xl uppercase tracking-wide"
                                    style={{
                                        background: "linear-gradient(135deg, #00D4AA 0%, #00FFC8 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    Mission Control
                                </h1>
                                <p className="font-carlito text-sm text-gray-400">
                                    Select your challenge
                                </p>
                            </div>
                        </div>

                        {/* Exit button */}
                        <button
                            onClick={onExit}
                            className="px-4 py-2 rounded-lg border border-gray-700 hover:border-accent-primary transition-colors"
                        >
                            <span className="font-carlito font-medium text-gray-400 hover:text-white">
                                Exit Portal
                            </span>
                        </button>
                    </div>
                </motion.header>

                {/* Mission grid */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-4 md:gap-6">
                        {missions.map((mission, index) => (
                            <MissionCard
                                key={mission.id}
                                mission={mission}
                                index={index}
                                onSelect={() => {
                                    if (mission.status === "available") {
                                        onSelect(mission.id);
                                    }
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function MissionCard({
    mission,
    index,
    onSelect,
}: {
    mission: Mission;
    index: number;
    onSelect: () => void;
}) {
    const isLocked = mission.status === "locked";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={!isLocked ? onSelect : undefined}
            className={`group relative rounded-xl overflow-hidden ${isLocked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                }`}
            style={{
                background: "linear-gradient(135deg, #1A1A24 0%, #151520 100%)",
                border: `1px solid ${isLocked ? "#2A2A35" : "#2A2A35"}`,
            }}
            whileHover={!isLocked ? { scale: 1.02, y: -4 } : {}}
        >
            {/* Top glow on hover */}
            {!isLocked && (
                <div
                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${mission.color}60, transparent)`,
                    }}
                />
            )}

            <div className="p-6 relative">
                {/* Icon + Difficulty */}
                <div className="flex items-start justify-between mb-4">
                    <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{
                            backgroundColor: `${mission.color}15`,
                            border: `2px solid ${mission.color}40`,
                        }}
                    >
                        <div style={{ color: mission.color }}>
                            {isLocked ? <Lock className="w-6 h-6" /> : mission.icon}
                        </div>
                    </div>

                    {/* Difficulty badge */}
                    <div
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                            backgroundColor: `${mission.color}10`,
                            border: `1px solid ${mission.color}40`,
                            color: mission.color,
                        }}
                    >
                        {mission.difficulty}
                    </div>
                </div>

                {/* Title */}
                <h3
                    className="font-bangers text-xl md:text-2xl mb-2 uppercase tracking-wide"
                    style={{
                        background: isLocked
                            ? "none"
                            : `linear-gradient(135deg, ${mission.color}, ${mission.color}80)`,
                        WebkitBackgroundClip: isLocked ? "unset" : "text",
                        WebkitTextFillColor: isLocked ? "#666" : "transparent",
                        color: isLocked ? "#666" : undefined,
                    }}
                >
                    {mission.name}
                </h3>

                {/* Description */}
                <p className="font-carlito text-sm text-gray-400 mb-4">
                    {mission.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <span className="font-carlito text-xs text-gray-500">
                        ⏱️ {mission.estimatedTime}
                    </span>

                    {!isLocked && (
                        <motion.div
                            className="flex items-center gap-2 text-sm font-medium"
                            style={{ color: mission.color }}
                            whileHover={{ x: 4 }}
                        >
                            <span className="font-carlito">Start Mission</span>
                            <ChevronRight className="w-4 h-4" />
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Locked overlay */}
            {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0A0A0F]/80 backdrop-blur-sm">
                    <div className="text-center">
                        <Lock className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                        <p className="font-carlito text-sm text-gray-500">
                            Complete previous missions
                        </p>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
