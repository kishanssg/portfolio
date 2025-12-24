"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ComicBubbleProps {
    text: string;
    type?: "speech" | "thought" | "shout";
    position?: "bottom" | "top" | "left" | "right";
    className?: string;
}

export default function ComicBubble({
    text,
    type = "speech",
    position = "bottom",
    className = "",
}: ComicBubbleProps) {
    const bubbleClass = type === "thought" ? "thought-bubble" : "speech-bubble";

    // Position-specific tail classes
    const tailPositionClass =
        position === "bottom"
            ? ""
            : position === "top"
                ? "[&::before]:top-[-20px] [&::before]:bottom-auto [&::before]:border-top-0 [&::before]:border-bottom-[20px] [&::before]:border-bottom-solid [&::after]:top-[-13px] [&::after]:bottom-auto [&::after]:border-top-0 [&::after]:border-bottom-[15px]"
                : "";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(bubbleClass, tailPositionClass, className)}
        >
            <p
                className={cn(
                    "comic-text",
                    type === "shout" && "font-bold text-xl uppercase tracking-wide"
                )}
            >
                {text}
            </p>
        </motion.div>
    );
}

// Action text component (POW! BAM! etc.)
export function ActionText({
    text,
    className = "",
}: {
    text: string;
    className?: string;
}) {
    return (
        <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className={cn(
                "action-text inline-block select-none",
                className
            )}
        >
            {text}
        </motion.div>
    );
}

// Comic panel wrapper
export function ComicPanel({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("comic-panel", className)}
        >
            <div className="halftone-bg absolute inset-0" />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}
