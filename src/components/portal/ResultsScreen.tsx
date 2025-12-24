"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Award } from "lucide-react";

interface ResultsScreenProps {
    missionId: string;
    score: number;
    onPlayAgain: () => void;
    onBackToHub: () => void;
}

// Grade calculation
function getGrade(score: number): { grade: string; color: string } {
    if (score >= 150) return { grade: "S", color: "#FFD700" };
    if (score >= 120) return { grade: "A", color: "#00FF88" };
    if (score >= 90) return { grade: "B", color: "#00D4FF" };
    if (score >= 60) return { grade: "C", color: "#FF9500" };
    return { grade: "D", color: "#FF006E" };
}

export default function ResultsScreen({
    missionId,
    score,
    onPlayAgain,
    onBackToHub,
}: ResultsScreenProps) {
    const isVictory = score >= 100;
    const { grade, color } = getGrade(score);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isVictory
                    ? "bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600"
                    : "bg-gradient-to-b from-gray-700 via-gray-800 to-black"
                }`}
        >
            {/* Halftone background */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                    backgroundSize: "8px 8px",
                }}
            />

            {/* Confetti (if victory) */}
            {isVictory && <Confetti />}

            {/* Main panel */}
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 100 }}
                className="relative max-w-3xl w-full"
            >
                <div
                    className="p-6 md:p-12"
                    style={{
                        background: "#F5E6D3",
                        border: "6px solid #000",
                        boxShadow: "8px 8px 0px rgba(0, 0, 0, 0.8)",
                    }}
                >
                    {/* Result title */}
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center mb-6 md:mb-8"
                    >
                        <motion.div
                            className="font-bangers text-5xl md:text-7xl mb-4"
                            style={{
                                color: isVictory ? "#FFD700" : "#888",
                                textShadow: `
                  4px 4px 0px ${isVictory ? "#FF006E" : "#333"},
                  8px 8px 0px rgba(0, 0, 0, 0.8)
                `,
                            }}
                            animate={isVictory ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                        >
                            {isVictory ? "VICTORY!" : "GAME OVER!"}
                        </motion.div>
                        <div className="text-6xl md:text-8xl mb-4">
                            {isVictory ? "🏆" : "💀"}
                        </div>
                    </motion.div>

                    {/* Score and Grade */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6, type: "spring" }}
                        className="mb-6 md:mb-8 p-6 md:p-8 bg-white border-4 border-black"
                        style={{ boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.8)" }}
                    >
                        <div className="flex items-center justify-center gap-8">
                            <div className="text-center">
                                <p className="font-carlito text-lg md:text-2xl mb-2 text-gray-600">FINAL SCORE</p>
                                <p
                                    className="font-bangers text-5xl md:text-7xl"
                                    style={{ color: "#00D4AA", textShadow: "3px 3px 0px rgba(0,0,0,0.3)" }}
                                >
                                    {score}
                                </p>
                            </div>
                            <div className="w-px h-20 bg-gray-300" />
                            <div className="text-center">
                                <p className="font-carlito text-lg md:text-2xl mb-2 text-gray-600">RANK</p>
                                <motion.p
                                    className="font-bangers text-5xl md:text-7xl"
                                    style={{ color, textShadow: "3px 3px 0px rgba(0,0,0,0.3)" }}
                                    initial={{ rotate: -10, scale: 0 }}
                                    animate={{ rotate: 0, scale: 1 }}
                                    transition={{ delay: 0.8, type: "spring" }}
                                >
                                    {grade}
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Achievement (if victory) */}
                    {isVictory && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="mb-6 md:mb-8"
                        >
                            <div
                                className="p-4 md:p-6 rounded-xl relative"
                                style={{
                                    background: "#F5E6D3",
                                    border: "4px solid #000",
                                    boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.8)",
                                }}
                            >
                                <p className="font-carlito text-lg md:text-xl text-center italic text-gray-800">
                                    <strong>🎖️ Achievement Unlocked!</strong>
                                    <br />
                                    &quot;Master of the Digital Realm&quot;
                                    <br />
                                    <span className="text-sm">Code Ninja is impressed!</span>
                                </p>
                                {/* Tail pointing up */}
                                <div
                                    className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                                    style={{
                                        width: 0,
                                        height: 0,
                                        borderLeft: "12px solid transparent",
                                        borderRight: "12px solid transparent",
                                        borderBottom: "12px solid #000",
                                    }}
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="grid grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-8"
                    >
                        <div
                            className="p-3 md:p-4 bg-white text-center border-2 md:border-4 border-black"
                            style={{ boxShadow: "3px 3px 0px rgba(0, 0, 0, 0.8)" }}
                        >
                            <Trophy className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-yellow-500" />
                            <p className="font-bangers text-xl md:text-2xl">{score}</p>
                            <p className="font-carlito text-xs md:text-sm text-gray-600">Points</p>
                        </div>
                        <div
                            className="p-3 md:p-4 bg-white text-center border-2 md:border-4 border-black"
                            style={{ boxShadow: "3px 3px 0px rgba(0, 0, 0, 0.8)" }}
                        >
                            <Star className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-blue-500" />
                            <p className="font-bangers text-xl md:text-2xl" style={{ color }}>
                                {grade}
                            </p>
                            <p className="font-carlito text-xs md:text-sm text-gray-600">Rank</p>
                        </div>
                        <div
                            className="p-3 md:p-4 bg-white text-center border-2 md:border-4 border-black"
                            style={{ boxShadow: "3px 3px 0px rgba(0, 0, 0, 0.8)" }}
                        >
                            <Award className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-purple-500" />
                            <p className="font-bangers text-xl md:text-2xl">{isVictory ? 1 : 0}</p>
                            <p className="font-carlito text-xs md:text-sm text-gray-600">Badge</p>
                        </div>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                        className="flex flex-col md:flex-row gap-3 md:gap-4"
                    >
                        <button
                            onClick={onPlayAgain}
                            className="flex-1 py-3 md:py-4 font-bangers text-xl md:text-2xl uppercase bg-green-400 border-4 border-black hover:bg-green-300 transition-colors"
                            style={{ boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.8)" }}
                        >
                            PLAY AGAIN!
                        </button>
                        <button
                            onClick={onBackToHub}
                            className="flex-1 py-3 md:py-4 font-bangers text-xl md:text-2xl uppercase bg-white border-4 border-black hover:bg-gray-100 transition-colors"
                            style={{ boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.8)" }}
                        >
                            BACK TO HUB
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

// Confetti animation component
function Confetti() {
    const colors = ["#FFD700", "#FF006E", "#00D4AA", "#00D4FF", "#FF9500"];

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 md:w-3 md:h-3"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: "-5%",
                        backgroundColor: colors[i % colors.length],
                        borderRadius: Math.random() > 0.5 ? "50%" : "0%",
                    }}
                    animate={{
                        y: ["0vh", "110vh"],
                        rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                        x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 100],
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
}
