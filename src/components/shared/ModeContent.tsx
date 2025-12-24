"use client";

import { useMode } from "@/hooks/useMode";
import dynamic from "next/dynamic";

// Lazy load PortalModeContainer for performance (heavy 3D components)
const PortalModeContainer = dynamic(
    () => import("@/components/portal/PortalModeContainer"),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4 animate-pulse">🌀</div>
                    <p className="text-accent-primary text-lg">Loading Portal...</p>
                </div>
            </div>
        ),
    }
);

interface ModeContentProps {
    professionalContent: React.ReactNode;
}

export default function ModeContent({ professionalContent }: ModeContentProps) {
    const { isPortal } = useMode();

    if (isPortal) {
        return <PortalModeContainer />;
    }

    return <>{professionalContent}</>;
}
