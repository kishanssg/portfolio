"use client";

export default function LoadingScreen() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-black">
            <div className="text-center">
                <div className="text-6xl mb-4 animate-pulse">🌀</div>
                <p className="text-accent-primary text-lg font-medium">Loading Portal...</p>
                <div className="mt-4 w-32 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
                    <div className="h-full bg-accent-primary animate-pulse w-1/2" />
                </div>
            </div>
        </div>
    );
}
