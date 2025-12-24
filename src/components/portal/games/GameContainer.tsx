"use client";

import dynamic from "next/dynamic";

// Import actual games
const PacketRouter = dynamic(() => import("./PacketRouter"), {
    ssr: false,
    loading: () => (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
            <div className="text-center">
                <div className="text-6xl mb-4 animate-pulse">🎮</div>
                <p className="text-accent-primary text-lg">Loading Game...</p>
            </div>
        </div>
    ),
});

interface GameContainerProps {
    missionId: string;
    onComplete: (score: number) => void;
    onQuit: () => void;
}

export default function GameContainer({
    missionId,
    onComplete,
    onQuit,
}: GameContainerProps) {
    // Map mission ID to actual game component
    switch (missionId) {
        case "debug-code":
        case "speed-typing":
            // Use Packet Router for available missions
            return <PacketRouter onComplete={onComplete} onQuit={onQuit} />;

        default:
            // Fallback for unavailable games
            return (
                <div className="fixed inset-0 z-50 bg-black/98 flex items-center justify-center p-4">
                    <div
                        className="p-8 md:p-12 max-w-xl text-center"
                        style={{
                            background: "#F5E6D3",
                            border: "6px solid #000",
                            boxShadow: "8px 8px 0px rgba(0, 0, 0, 0.8)",
                        }}
                    >
                        <div className="text-6xl mb-6">🚧</div>
                        <h2
                            className="font-bangers text-4xl mb-4"
                            style={{ textShadow: "3px 3px 0px rgba(0, 0, 0, 0.5)" }}
                        >
                            COMING SOON!
                        </h2>
                        <p className="font-carlito text-xl text-gray-700 mb-8 italic">
                            This mission is still being prepared by the Code Ninja.
                            <br />
                            Check back soon!
                        </p>
                        <button
                            onClick={onQuit}
                            className="px-8 py-4 font-bangers text-2xl uppercase bg-gray-300 border-4 border-black hover:bg-gray-200 transition-colors"
                            style={{ boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.8)" }}
                        >
                            RETURN TO HUB
                        </button>
                    </div>
                </div>
            );
    }
}
