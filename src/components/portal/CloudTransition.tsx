"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Cloud, Sky } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/hooks/useMode";
import * as THREE from "three";

// 3D Cloud Scene with camera movement
function TransitionScene({ direction }: { direction: "in" | "out" }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        // Animate camera moving through clouds
        if (direction === "in") {
            state.camera.position.z = 5 - t * 2.5;
        } else {
            state.camera.position.z = -5 + t * 2.5;
        }

        // Subtle camera shake for immersion
        state.camera.position.x = Math.sin(t * 3) * 0.1;
        state.camera.position.y = Math.cos(t * 2) * 0.05;
    });

    return (
        <>
            {/* Sky background */}
            <Sky sunPosition={[100, 20, 100]} turbidity={10} rayleigh={0.5} />

            {/* Fog for volumetric feel */}
            <fog attach="fog" args={["#1a1a2e", 1, 15]} />

            {/* Ambient lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 5]} intensity={0.8} />

            {/* Multiple cloud layers at different depths */}
            <group ref={groupRef}>
                {/* Front layer - dense clouds */}
                <Cloud position={[-2, 0, -2]} speed={0.4} opacity={0.9} />
                <Cloud position={[2, 1, -3]} speed={0.3} opacity={0.8} />
                <Cloud position={[0, -1, -4]} speed={0.35} opacity={0.85} />

                {/* Middle layer */}
                <Cloud position={[-4, 2, -6]} speed={0.25} opacity={0.7} />
                <Cloud position={[4, -2, -7]} speed={0.3} opacity={0.65} />

                {/* Back layer - distant clouds */}
                <Cloud position={[0, 3, -10]} speed={0.15} opacity={0.5} />
                <Cloud position={[-5, -1, -12]} speed={0.2} opacity={0.4} />
                <Cloud position={[5, 2, -14]} speed={0.18} opacity={0.35} />
            </group>
        </>
    );
}

export default function CloudTransition() {
    const { isTransitioning, isPortal } = useMode();

    return (
        <AnimatePresence>
            {isTransitioning && (
                <motion.div
                    className="fixed inset-0 z-[100]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* 3D Cloud Canvas */}
                    <Canvas
                        camera={{ position: [0, 0, 5], fov: 75 }}
                        gl={{ antialias: true }}
                    >
                        <TransitionScene direction={isPortal ? "in" : "out"} />
                    </Canvas>

                    {/* Loading text overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-center"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="text-6xl mb-4"
                            >
                                {isPortal ? "🌀" : "🏠"}
                            </motion.div>
                            <p className="text-white text-2xl font-bold mb-4 drop-shadow-lg">
                                {isPortal
                                    ? "Entering the Builder's Realm..."
                                    : "Returning to Reality..."}
                            </p>
                            <div className="w-64 h-2 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm mx-auto">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
