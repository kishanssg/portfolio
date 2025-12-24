"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Packet {
    id: string;
    x: number;
    y: number;
    type: "good" | "bad";
    speed: number;
}

interface PacketRouterProps {
    onComplete: (score: number) => void;
    onQuit: () => void;
}

export default function PacketRouter({ onComplete, onQuit }: PacketRouterProps) {
    const [routerX, setRouterX] = useState(50);
    const [packets, setPackets] = useState<Packet[]>([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [packetsCaught, setPacketsCaught] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);
    const gameAreaRef = useRef<HTMLDivElement>(null);

    // Handle game completion
    const handleComplete = useCallback(
        (finalScore: number) => {
            if (gameEnded) return;
            setGameEnded(true);
            onComplete(finalScore);
        },
        [gameEnded, onComplete]
    );

    // Spawn packets
    useEffect(() => {
        if (!gameStarted || gameEnded) return;

        const spawnInterval = setInterval(() => {
            const newPacket: Packet = {
                id: Math.random().toString(36).substring(7),
                x: Math.random() * 80 + 10,
                y: 0,
                type: Math.random() > 0.3 ? "good" : "bad",
                speed: Math.random() * 1.5 + 0.8,
            };
            setPackets((prev) => [...prev, newPacket]);
        }, 1000);

        return () => clearInterval(spawnInterval);
    }, [gameStarted, gameEnded]);

    // Move packets down
    useEffect(() => {
        if (!gameStarted || gameEnded) return;

        const moveInterval = setInterval(() => {
            setPackets((prev) =>
                prev
                    .map((p) => ({ ...p, y: p.y + p.speed }))
                    .filter((p) => p.y < 95)
            );
        }, 50);

        return () => clearInterval(moveInterval);
    }, [gameStarted, gameEnded]);

    // Check collisions
    useEffect(() => {
        if (!gameStarted || gameEnded) return;

        const routerWidth = 12;

        setPackets((prev) => {
            const remaining: Packet[] = [];
            let scoreChange = 0;
            let caughtChange = 0;

            prev.forEach((packet) => {
                const inRouterRange =
                    packet.y >= 78 &&
                    packet.y <= 88 &&
                    packet.x >= routerX - routerWidth &&
                    packet.x <= routerX + routerWidth;

                if (inRouterRange) {
                    if (packet.type === "good") {
                        scoreChange += 10;
                        caughtChange += 1;
                    } else {
                        scoreChange -= 5;
                    }
                } else {
                    remaining.push(packet);
                }
            });

            if (scoreChange !== 0) {
                setScore((prev) => Math.max(0, prev + scoreChange));
            }
            if (caughtChange > 0) {
                setPacketsCaught((prev) => prev + caughtChange);
            }

            return remaining;
        });
    }, [packets, routerX, gameStarted, gameEnded]);

    // Timer countdown
    useEffect(() => {
        if (!gameStarted || gameEnded || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    handleComplete(score);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [gameStarted, gameEnded, timeLeft, score, handleComplete]);

    // Win condition
    useEffect(() => {
        if (packetsCaught >= 20 && !gameEnded) {
            handleComplete(score + timeLeft * 2);
        }
    }, [packetsCaught, score, timeLeft, gameEnded, handleComplete]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
                setRouterX((prev) => Math.max(10, prev - 5));
            } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
                setRouterX((prev) => Math.min(90, prev + 5));
            } else if (e.key === "Escape") {
                onQuit();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onQuit]);

    return (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-gray-900 via-blue-950 to-black flex flex-col">
            {/* Game header (comic style) */}
            <div
                className="p-4 md:p-6 border-b-4 border-black"
                style={{ background: "#F5E6D3" }}
            >
                <div className="flex justify-between items-center max-w-6xl mx-auto">
                    {/* Title */}
                    <h1
                        className="font-bangers text-3xl md:text-5xl uppercase"
                        style={{
                            color: "#00D4AA",
                            textShadow: "3px 3px 0px rgba(0, 0, 0, 0.8)",
                        }}
                    >
                        PACKET ROUTER!
                    </h1>

                    {/* Stats */}
                    <div className="flex gap-2 md:gap-4">
                        <div
                            className="px-3 py-2 md:px-6 md:py-3 bg-white border-2 md:border-4 border-black"
                            style={{ boxShadow: "3px 3px 0px rgba(0, 0, 0, 0.8)" }}
                        >
                            <p className="font-carlito text-xs md:text-sm text-gray-600">SCORE</p>
                            <p className="font-bangers text-xl md:text-3xl text-green-500">{score}</p>
                        </div>
                        <div
                            className="px-3 py-2 md:px-6 md:py-3 bg-white border-2 md:border-4 border-black"
                            style={{ boxShadow: "3px 3px 0px rgba(0, 0, 0, 0.8)" }}
                        >
                            <p className="font-carlito text-xs md:text-sm text-gray-600">TIME</p>
                            <p
                                className={`font-bangers text-xl md:text-3xl ${timeLeft <= 10 ? "text-red-500 animate-pulse" : "text-orange-500"
                                    }`}
                            >
                                {timeLeft}s
                            </p>
                        </div>
                        <div
                            className="px-3 py-2 md:px-6 md:py-3 bg-white border-2 md:border-4 border-black"
                            style={{ boxShadow: "3px 3px 0px rgba(0, 0, 0, 0.8)" }}
                        >
                            <p className="font-carlito text-xs md:text-sm text-gray-600">CAUGHT</p>
                            <p className="font-bangers text-xl md:text-3xl text-blue-500">{packetsCaught}/20</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Game area */}
            <div ref={gameAreaRef} className="flex-1 relative overflow-hidden">
                {/* Grid background */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: "linear-gradient(#00D4AA 1px, transparent 1px), linear-gradient(90deg, #00D4AA 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* Start screen */}
                {!gameStarted && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center p-4"
                    >
                        <div
                            className="p-8 md:p-12 max-w-2xl w-full"
                            style={{
                                background: "#F5E6D3",
                                border: "6px solid #000",
                                boxShadow: "8px 8px 0px rgba(0, 0, 0, 0.8)",
                            }}
                        >
                            <h2
                                className="font-bangers text-4xl md:text-6xl text-center mb-6"
                                style={{ textShadow: "3px 3px 0px rgba(0, 0, 0, 0.5)" }}
                            >
                                READY?
                            </h2>
                            <div
                                className="mb-8 p-4 md:p-6 rounded-xl"
                                style={{
                                    background: "#F5E6D3",
                                    border: "4px solid #000",
                                    boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.8)",
                                }}
                            >
                                <p className="font-carlito text-lg md:text-xl italic text-gray-800 leading-relaxed">
                                    <strong>Mission:</strong> Route data packets safely!
                                    <br />
                                    <strong>Controls:</strong> ← → Arrow keys (or A/D)
                                    <br />
                                    <strong>Goal:</strong> Catch 20 green packets! 📦
                                    <br />
                                    <strong>Watch out:</strong> Red packets are malware! 🦠
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setGameStarted(true)}
                                    className="flex-1 py-4 font-bangers text-2xl md:text-4xl uppercase bg-green-400 border-4 border-black hover:bg-green-300 transition-colors"
                                    style={{ boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.8)" }}
                                >
                                    START!
                                </button>
                                <button
                                    onClick={onQuit}
                                    className="py-4 px-6 font-bangers text-xl bg-gray-300 border-4 border-black hover:bg-gray-200 transition-colors"
                                    style={{ boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.8)" }}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Packets */}
                <AnimatePresence>
                    {packets.map((packet) => (
                        <motion.div
                            key={packet.id}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className={`absolute w-10 h-10 md:w-14 md:h-14 rounded-lg border-4 border-black flex items-center justify-center text-xl md:text-2xl ${packet.type === "good" ? "bg-green-400" : "bg-red-500"
                                }`}
                            style={{
                                left: `${packet.x}%`,
                                top: `${packet.y}%`,
                                transform: "translate(-50%, -50%)",
                                boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.8)",
                            }}
                        >
                            {packet.type === "good" ? "📦" : "🦠"}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Router (player) */}
                {gameStarted && (
                    <motion.div
                        animate={{ left: `${routerX}%` }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="absolute bottom-8 md:bottom-12"
                        style={{ transform: "translateX(-50%)" }}
                    >
                        <div
                            className="p-3 md:p-4 bg-cyan-400 border-4 border-black rounded-lg"
                            style={{ boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.8)" }}
                        >
                            <div className="text-3xl md:text-4xl">🖥️</div>
                        </div>
                        <p className="text-center font-bangers text-white text-xs md:text-sm mt-1">
                            ROUTER
                        </p>
                    </motion.div>
                )}

                {/* Controls hint */}
                {gameStarted && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                        <p className="text-gray-500 text-xs">← → Move | ESC Quit</p>
                    </div>
                )}
            </div>
        </div>
    );
}
