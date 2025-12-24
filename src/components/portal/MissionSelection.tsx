"use client";

import { motion } from "framer-motion";
import { Bug, Zap, Building2, Target } from "lucide-react";
import { useState } from "react";
import { useMode } from "@/hooks/useMode";

interface Mission {
    id: string;
    name: string;
    icon: React.ReactNode;
    difficulty: "Easy" | "Medium" | "Hard";
    description: string;
    color: string;
    available: boolean;
}

const missions: Mission[] = [
    {
        id: "debug-code",
        name: "Debug The Code",
        icon: <Bug className="w-10 h-10 md:w-12 md:h-12" />,
        difficulty: "Easy",
        description: "Find and fix bugs in code snippets. Test your debugging skills!",
        color: "#00FF88",
        available: true,
    },
    {
        id: "speed-typing",
        name: "Speed Typing",
        icon: <Zap className="w-10 h-10 md:w-12 md:h-12" />,
        difficulty: "Medium",
        description: "Type code snippets as fast as you can. Beat the clock!",
        color: "#00D4FF",
        available: true,
    },
    {
        id: "system-design",
        name: "System Design",
        icon: <Building2 className="w-10 h-10 md:w-12 md:h-12" />,
        difficulty: "Hard",
        description: "Build scalable architectures. Drag and drop components!",
        color: "#FF006E",
        available: false,
    },
    {
        id: "bug-hunt",
        name: "Bug Hunt 3D",
        icon: <Target className="w-10 h-10 md:w-12 md:h-12" />,
        difficulty: "Medium",
        description: "Find hidden bugs in a 3D environment. Unlock fun facts!",
        color: "#FFD700",
        available: false,
    },
];

interface MissionSelectionProps {
    onSelectMission: (missionId: string) => void;
}

export default function MissionSelection({ onSelectMission }: MissionSelectionProps) {
    const { toggleMode } = useMode();

    return (
        <div className="fixed inset-0 z-30 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
            <div className="max-w-5xl w-full py-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8 md:mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4">
                        Choose Your Mission
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400">
                        Select a challenge to prove your coding prowess
                    </p>
                </motion.div>

                {/* Mission Grid */}
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    {missions.map((mission, index) => (
                        <MissionCard
                            key={mission.id}
                            mission={mission}
                            index={index}
                            onSelect={() => {
                                if (mission.available) {
                                    onSelectMission(mission.id);
                                }
                            }}
                        />
                    ))}
                </div>

                {/* Back button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center mt-8"
                >
                    <button
                        onClick={toggleMode}
                        className="text-gray-400 hover:text-white transition-colors text-sm md:text-base"
                    >
                        ← Back to Professional Mode
                    </button>
                </motion.div>
            </div>
        </div>
    );
}

// Mission Card Component
function MissionCard({
    mission,
    index,
    onSelect,
}: {
    mission: Mission;
    index: number;
    onSelect: () => void;
}) {
    const [isHovered, setIsHovered] = useState(false);

    const difficultyColor = {
        Easy: "text-green-400",
        Medium: "text-yellow-400",
        Hard: "text-red-400",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={onSelect}
            className={`relative group ${mission.available ? "cursor-pointer" : "cursor-not-allowed opacity-60"}`}
        >
            <div
                className="relative bg-gray-900/80 backdrop-blur-md border-2 rounded-2xl p-6 md:p-8 transition-all duration-300 overflow-hidden"
                style={{
                    borderColor:
                        isHovered && mission.available
                            ? mission.color
                            : "rgba(255, 255, 255, 0.1)",
                    boxShadow:
                        isHovered && mission.available
                            ? `0 0 30px ${mission.color}40`
                            : "none",
                    transform:
                        isHovered && mission.available ? "translateY(-8px)" : "translateY(0)",
                }}
            >
                {/* Background glow effect */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(circle at center, ${mission.color}, transparent 70%)`,
                    }}
                />

                {/* Content */}
                <div className="relative z-10">
                    {/* Icon */}
                    <div
                        className="mb-3 md:mb-4 inline-block p-3 md:p-4 rounded-xl"
                        style={{
                            backgroundColor: `${mission.color}20`,
                            color: mission.color,
                        }}
                    >
                        {mission.icon}
                    </div>

                    {/* Mission name */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {mission.name}
                    </h3>

                    {/* Difficulty badge */}
                    <div className="flex items-center gap-2 mb-3 md:mb-4">
                        <span
                            className={`text-sm font-semibold ${difficultyColor[mission.difficulty]}`}
                        >
                            ⚡ {mission.difficulty}
                        </span>
                        {!mission.available && (
                            <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                                Coming Soon
                            </span>
                        )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">
                        {mission.description}
                    </p>

                    {/* CTA */}
                    <motion.button
                        whileHover={mission.available ? { scale: 1.05 } : {}}
                        whileTap={mission.available ? { scale: 0.95 } : {}}
                        disabled={!mission.available}
                        className="w-full py-2.5 md:py-3 rounded-lg font-semibold transition-all text-sm md:text-base"
                        style={{
                            backgroundColor:
                                isHovered && mission.available
                                    ? mission.color
                                    : `${mission.color}20`,
                            color:
                                isHovered && mission.available ? "#000" : mission.color,
                            cursor: mission.available ? "pointer" : "not-allowed",
                        }}
                    >
                        {mission.available ? "Start Mission →" : "Locked 🔒"}
                    </motion.button>
                </div>

                {/* Hover shine effect */}
                {isHovered && mission.available && (
                    <motion.div
                        className="absolute inset-0 opacity-20"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
                        style={{
                            background: `linear-gradient(90deg, transparent, ${mission.color}, transparent)`,
                        }}
                    />
                )}
            </div>
        </motion.div>
    );
}
