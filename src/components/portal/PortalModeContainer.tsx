"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import NinjaIntroduction from "./NinjaIntroduction";
import MissionBriefing from "./MissionBriefing";
import ResultsScreen from "./ResultsScreen";

// Lazy load heavy 3D components
const World3D = dynamic(() => import("./World3D"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                <div className="text-6xl mb-4 animate-pulse">🌀</div>
                <p className="text-accent-primary text-lg">Loading World...</p>
            </div>
        </div>
    ),
});

const GameContainer = dynamic(() => import("./games/GameContainer"), {
    ssr: false,
});

type PortalState =
    | "intro"
    | "exploring"
    | "briefing"
    | "playing"
    | "results";

export default function PortalModeContainer() {
    const [state, setState] = useState<PortalState>("intro");
    const [selectedMission, setSelectedMission] = useState<string | null>(null);
    const [gameScore, setGameScore] = useState<number>(0);

    // State handlers
    const handleIntroComplete = useCallback(() => {
        setState("exploring");
    }, []);

    const handleMissionSelect = useCallback((missionId: string) => {
        setSelectedMission(missionId);
        setState("briefing");
    }, []);

    const handleMissionStart = useCallback(() => {
        setState("playing");
    }, []);

    const handleMissionAbort = useCallback(() => {
        setSelectedMission(null);
        setState("exploring");
    }, []);

    const handleGameComplete = useCallback((score: number) => {
        setGameScore(score);
        setState("results");
    }, []);

    const handlePlayAgain = useCallback(() => {
        if (selectedMission) {
            setState("briefing");
        } else {
            setState("exploring");
        }
    }, [selectedMission]);

    const handleBackToHub = useCallback(() => {
        setState("exploring");
        setSelectedMission(null);
    }, []);

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
            {/* 3D World (shown when exploring or during intro) */}
            {(state === "intro" || state === "exploring") && (
                <div className="absolute inset-0 z-0">
                    <World3D />
                </div>
            )}

            {/* Intro overlay */}
            {state === "intro" && (
                <NinjaIntroduction onComplete={handleIntroComplete} />
            )}

            {/* Mission briefing */}
            {state === "briefing" && selectedMission && (
                <MissionBriefing
                    missionId={selectedMission}
                    onStart={handleMissionStart}
                    onAbort={handleMissionAbort}
                />
            )}

            {/* Game */}
            {state === "playing" && selectedMission && (
                <GameContainer
                    missionId={selectedMission}
                    onComplete={handleGameComplete}
                    onQuit={handleMissionAbort}
                />
            )}

            {/* Results */}
            {state === "results" && selectedMission && (
                <ResultsScreen
                    missionId={selectedMission}
                    score={gameScore}
                    onPlayAgain={handlePlayAgain}
                    onBackToHub={handleBackToHub}
                />
            )}
        </div>
    );
}
