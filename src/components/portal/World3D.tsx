"use client";

import { Canvas } from "@react-three/fiber";
import { Stars, Grid, KeyboardControls } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { Suspense, useState, useCallback } from "react";
import CharacterController, { controlsMap } from "./CharacterController";
import MissionPortals from "./MissionPortals";
import InteractionPrompt from "./InteractionPrompt";
import * as THREE from "three";

// Mission data for interaction prompt
const missionData: Record<string, { name: string; color: string; available: boolean }> = {
    "debug-code": { name: "Debug The Code", color: "#00FF88", available: true },
    "speed-typing": { name: "Speed Typing", color: "#00D4FF", available: true },
    "system-design": { name: "System Design", color: "#FF006E", available: false },
    "tech-quiz": { name: "Tech Trivia", color: "#FFD700", available: false },
};

// Loading fallback
function LoadingWorld() {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#00D4AA" wireframe />
        </mesh>
    );
}

// Ground Platform
function GroundPlatform() {
    return (
        <RigidBody type="fixed" colliders="cuboid">
            {/* Main platform */}
            <mesh receiveShadow position={[0, -0.5, 0]}>
                <boxGeometry args={[40, 1, 40]} />
                <meshStandardMaterial
                    color="#0a0a0a"
                    roughness={0.3}
                    metalness={0.8}
                />
            </mesh>

            {/* Glowing grid overlay */}
            <Grid
                position={[0, 0.01, 0]}
                args={[40, 40]}
                cellSize={1}
                cellThickness={0.5}
                cellColor="#00D4AA"
                sectionSize={5}
                sectionThickness={1}
                sectionColor="#00FF88"
                fadeDistance={50}
                fadeStrength={1}
                infiniteGrid={false}
            />

            {/* Platform edge glow */}
            <mesh position={[0, 0.02, 0]}>
                <ringGeometry args={[19, 20, 64]} />
                <meshBasicMaterial color="#00D4AA" transparent opacity={0.3} side={THREE.DoubleSide} />
            </mesh>
        </RigidBody>
    );
}

// Floating ambient particles
function FloatingParticles() {
    const particles = Array.from({ length: 80 }, () => ({
        position: [
            (Math.random() - 0.5) * 35,
            Math.random() * 8 + 1,
            (Math.random() - 0.5) * 35,
        ] as [number, number, number],
        scale: Math.random() * 0.08 + 0.03,
    }));

    return (
        <group>
            {particles.map((p, i) => (
                <mesh key={i} position={p.position}>
                    <sphereGeometry args={[p.scale, 8, 8]} />
                    <meshBasicMaterial color="#00FF88" transparent opacity={0.5} />
                </mesh>
            ))}
        </group>
    );
}

// Invisible walls to keep player on platform
function InvisibleWalls() {
    return (
        <>
            {/* North wall */}
            <RigidBody type="fixed" colliders="cuboid">
                <mesh position={[0, 2, -21]} visible={false}>
                    <boxGeometry args={[44, 8, 2]} />
                </mesh>
            </RigidBody>
            {/* South wall */}
            <RigidBody type="fixed" colliders="cuboid">
                <mesh position={[0, 2, 21]} visible={false}>
                    <boxGeometry args={[44, 8, 2]} />
                </mesh>
            </RigidBody>
            {/* East wall */}
            <RigidBody type="fixed" colliders="cuboid">
                <mesh position={[21, 2, 0]} visible={false}>
                    <boxGeometry args={[2, 8, 44]} />
                </mesh>
            </RigidBody>
            {/* West wall */}
            <RigidBody type="fixed" colliders="cuboid">
                <mesh position={[-21, 2, 0]} visible={false}>
                    <boxGeometry args={[2, 8, 44]} />
                </mesh>
            </RigidBody>
        </>
    );
}

// UI Overlay
function UIOverlay({ nearPortal }: { nearPortal: string | null }) {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {/* Header */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                    Welcome to the <span className="text-accent-primary">Builder&apos;s Realm</span>
                </h1>
                <div className="flex gap-4 justify-center text-sm text-gray-400 mt-2">
                    <span className="bg-gray-900/50 px-3 py-1 rounded-full">WASD - Move</span>
                    <span className="bg-gray-900/50 px-3 py-1 rounded-full">SPACE - Jump</span>
                    <span className="bg-gray-900/50 px-3 py-1 rounded-full">E - Interact</span>
                </div>
            </div>

            {/* Portal interaction prompt */}
            {nearPortal && (
                <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="bg-gray-900/80 backdrop-blur-sm border border-accent-primary/50 rounded-xl px-6 py-3">
                        <p className="text-white text-lg font-bold">
                            Press <span className="text-accent-primary">E</span> to Enter Mission
                        </p>
                    </div>
                </div>
            )}

            {/* Mini instructions */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-gray-500 text-sm">
                    Walk to a portal to start a mission
                </p>
            </div>
        </div>
    );
}

export default function World3D() {
    const [nearPortal, setNearPortal] = useState<string | null>(null);

    const handlePortalNear = useCallback((portalId: string | null) => {
        setNearPortal(portalId);
    }, []);

    return (
        <KeyboardControls map={controlsMap}>
            <div className="w-full h-screen bg-black">
                <Canvas shadows camera={{ position: [0, 8, 12], fov: 60 }}>
                    <Suspense fallback={<LoadingWorld />}>
                        {/* Fog for depth */}
                        <fog attach="fog" args={["#000000", 20, 80]} />

                        {/* Lighting */}
                        <ambientLight intensity={0.15} />
                        <directionalLight
                            position={[15, 25, 15]}
                            intensity={0.6}
                            castShadow
                            shadow-mapSize={[2048, 2048]}
                        />
                        <pointLight position={[0, 8, 0]} intensity={0.4} color="#00D4AA" distance={30} />
                        <pointLight position={[-15, 5, -15]} intensity={0.2} color="#FF006E" distance={20} />
                        <pointLight position={[15, 5, -15]} intensity={0.2} color="#00D4FF" distance={20} />
                        <pointLight position={[-15, 5, 15]} intensity={0.2} color="#FFD700" distance={20} />
                        <pointLight position={[15, 5, 15]} intensity={0.2} color="#00FF88" distance={20} />

                        {/* Starfield background */}
                        <Stars
                            radius={300}
                            depth={100}
                            count={8000}
                            factor={6}
                            saturation={0.3}
                            fade
                            speed={0.3}
                        />

                        {/* Physics World */}
                        <Physics gravity={[0, -20, 0]}>
                            <GroundPlatform />
                            <InvisibleWalls />
                            <CharacterController onNearPortal={handlePortalNear} />
                            <MissionPortals onPortalNear={handlePortalNear} />
                        </Physics>

                        {/* Floating particles */}
                        <FloatingParticles />
                    </Suspense>
                </Canvas>

                {/* UI Overlay */}
                <UIOverlay nearPortal={nearPortal} />

                {/* Comic-style interaction prompt */}
                {nearPortal && missionData[nearPortal] && (
                    <InteractionPrompt
                        isNear={!!nearPortal}
                        missionName={missionData[nearPortal].name}
                        missionColor={missionData[nearPortal].color}
                        onInteract={() => {
                            if (missionData[nearPortal]?.available) {
                                console.log("Starting mission:", nearPortal);
                                // TODO: Trigger mission start via state machine
                            } else {
                                console.log("Mission not available yet:", nearPortal);
                            }
                        }}
                    />
                )}
            </div>
        </KeyboardControls>
    );
}
