"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface Mission {
    id: string;
    name: string;
    position: [number, number, number];
    color: string;
    icon: string;
    available: boolean;
}

const missions: Mission[] = [
    {
        id: "debug-code",
        name: "Debug The Code",
        position: [-10, 2, -10],
        color: "#00FF88",
        icon: "🐛",
        available: true,
    },
    {
        id: "speed-typing",
        name: "Speed Typing",
        position: [10, 2, -10],
        color: "#00D4FF",
        icon: "⚡",
        available: true,
    },
    {
        id: "system-design",
        name: "System Design",
        position: [-10, 2, 10],
        color: "#FF006E",
        icon: "🏗️",
        available: false,
    },
    {
        id: "tech-quiz",
        name: "Tech Trivia",
        position: [10, 2, 10],
        color: "#FFD700",
        icon: "🎯",
        available: false,
    },
];

interface MissionPortalsProps {
    playerPosition?: THREE.Vector3;
    onPortalNear?: (portalId: string | null) => void;
}

export default function MissionPortals({ playerPosition, onPortalNear }: MissionPortalsProps) {
    return (
        <>
            {missions.map((mission) => (
                <MissionPortal
                    key={mission.id}
                    mission={mission}
                    playerPosition={playerPosition}
                    onNear={onPortalNear}
                />
            ))}
        </>
    );
}

interface MissionPortalProps {
    mission: Mission;
    playerPosition?: THREE.Vector3;
    onNear?: (portalId: string | null) => void;
}

function MissionPortal({ mission, playerPosition, onNear }: MissionPortalProps) {
    const ringRef = useRef<THREE.Mesh>(null);
    const innerRingRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        // Rotate outer ring
        if (ringRef.current) {
            ringRef.current.rotation.y += 0.01;
            ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
        }

        // Counter-rotate inner ring
        if (innerRingRef.current) {
            innerRingRef.current.rotation.y -= 0.015;
            innerRingRef.current.rotation.z = Math.cos(t * 0.3) * 0.1;
        }

        // Floating animation
        if (groupRef.current) {
            groupRef.current.position.y = mission.position[1] + Math.sin(t + mission.position[0]) * 0.3;
        }

        // Check proximity to player
        if (playerPosition && onNear) {
            const portalPos = new THREE.Vector3(...mission.position);
            const distance = playerPosition.distanceTo(portalPos);
            if (distance < 4) {
                onNear(mission.id);
            }
        }
    });

    return (
        <group ref={groupRef} position={mission.position}>
            {/* Outer rotating ring */}
            <mesh ref={ringRef}>
                <torusGeometry args={[1.8, 0.12, 16, 64]} />
                <meshStandardMaterial
                    color={mission.color}
                    emissive={mission.color}
                    emissiveIntensity={mission.available ? 0.8 : 0.2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>

            {/* Inner rotating ring */}
            <mesh ref={innerRingRef}>
                <torusGeometry args={[1.4, 0.08, 16, 64]} />
                <meshStandardMaterial
                    color={mission.available ? "#ffffff" : "#555555"}
                    emissive={mission.available ? mission.color : "#333333"}
                    emissiveIntensity={0.4}
                    roughness={0.3}
                    metalness={0.7}
                />
            </mesh>

            {/* Inner glow disk */}
            <mesh rotation={[0, 0, 0]}>
                <circleGeometry args={[1.3, 32]} />
                <meshBasicMaterial
                    color={mission.color}
                    transparent
                    opacity={mission.available ? 0.3 : 0.1}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Mission icon */}
            <Text
                position={[0, 0, 0.1]}
                fontSize={0.8}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {mission.icon}
            </Text>

            {/* Mission name below */}
            <Text
                position={[0, -2.5, 0]}
                fontSize={0.35}
                color={mission.available ? mission.color : "#666666"}
                anchorX="center"
                anchorY="middle"
                maxWidth={4}
            >
                {mission.name}
            </Text>

            {/* Status text */}
            {!mission.available && (
                <Text
                    position={[0, -3, 0]}
                    fontSize={0.2}
                    color="#666666"
                    anchorX="center"
                    anchorY="middle"
                >
                    Coming Soon
                </Text>
            )}

            {/* Portal glow light */}
            <pointLight
                position={[0, 0, 0]}
                intensity={mission.available ? 2 : 0.5}
                color={mission.color}
                distance={10}
            />

            {/* Ground glow */}
            <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[2.5, 32]} />
                <meshBasicMaterial
                    color={mission.color}
                    transparent
                    opacity={mission.available ? 0.15 : 0.05}
                />
            </mesh>

            {/* Particles */}
            <PortalParticles color={mission.color} active={mission.available} />
        </group>
    );
}

function PortalParticles({ color, active }: { color: string; active: boolean }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005;
        }
    });

    if (!active) return null;

    const particles = Array.from({ length: 15 }, (_, i) => {
        const angle = (i / 15) * Math.PI * 2;
        const radius = 2.2 + Math.random() * 0.3;
        return {
            position: [
                Math.cos(angle) * radius,
                (Math.random() - 0.5) * 1.5,
                Math.sin(angle) * radius,
            ] as [number, number, number],
            scale: Math.random() * 0.06 + 0.03,
        };
    });

    return (
        <group ref={groupRef}>
            {particles.map((p, i) => (
                <mesh key={i} position={p.position}>
                    <sphereGeometry args={[p.scale, 8, 8]} />
                    <meshBasicMaterial color={color} transparent opacity={0.8} />
                </mesh>
            ))}
        </group>
    );
}
