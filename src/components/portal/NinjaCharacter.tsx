"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NinjaCharacterProps {
    position?: [number, number, number];
}

export default function NinjaCharacter({ position = [0, 0, 0] }: NinjaCharacterProps) {
    const groupRef = useRef<THREE.Group>(null);
    const leftArmRef = useRef<THREE.Mesh>(null);
    const [isWaving, setIsWaving] = useState(false);

    // Idle breathing animation + waving
    useFrame((state) => {
        if (groupRef.current) {
            // Breathing animation
            groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;

            // Subtle rotation
            if (!isWaving) {
                groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
            }
        }

        // Waving animation for left arm
        if (leftArmRef.current && isWaving) {
            leftArmRef.current.rotation.z = -Math.PI / 3 + Math.sin(state.clock.elapsedTime * 8) * 0.3;
        } else if (leftArmRef.current) {
            leftArmRef.current.rotation.z = -0.2;
        }
    });

    const handleClick = () => {
        if (!isWaving) {
            setIsWaving(true);
            setTimeout(() => setIsWaving(false), 2000);
        }
    };

    return (
        <group ref={groupRef} position={position} onClick={handleClick}>
            {/* Base platform */}
            <mesh position={[0, -0.5, 0]}>
                <cylinderGeometry args={[1.5, 1.8, 0.2, 32]} />
                <meshStandardMaterial
                    color="#00D4AA"
                    emissive="#00D4AA"
                    emissiveIntensity={0.3}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Glow ring around platform */}
            <mesh position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.7, 0.05, 8, 64]} />
                <meshStandardMaterial
                    color="#00D4AA"
                    emissive="#00D4AA"
                    emissiveIntensity={1}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* LEGO-style Body (main block) */}
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[0.6, 0.8, 0.4]} />
                <meshStandardMaterial color="#1A1A1A" metalness={0.3} roughness={0.7} />
            </mesh>

            {/* Head (LEGO style - blocky) */}
            <mesh position={[0, 1.3, 0]}>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial color="#2A2A2A" metalness={0.3} roughness={0.7} />
            </mesh>

            {/* Ninja Mask (cyan headband) */}
            <mesh position={[0, 1.3, 0.26]}>
                <boxGeometry args={[0.52, 0.15, 0.02]} />
                <meshStandardMaterial
                    color="#00D4AA"
                    emissive="#00D4AA"
                    emissiveIntensity={0.5}
                />
            </mesh>

            {/* Eyes (glowing squares - LEGO style) */}
            <mesh position={[-0.12, 1.35, 0.27]}>
                <boxGeometry args={[0.08, 0.08, 0.01]} />
                <meshStandardMaterial
                    color="#00FF88"
                    emissive="#00FF88"
                    emissiveIntensity={2}
                />
            </mesh>
            <mesh position={[0.12, 1.35, 0.27]}>
                <boxGeometry args={[0.08, 0.08, 0.01]} />
                <meshStandardMaterial
                    color="#00FF88"
                    emissive="#00FF88"
                    emissiveIntensity={2}
                />
            </mesh>

            {/* Left Arm (animated for waving) */}
            <mesh ref={leftArmRef} position={[-0.45, 0.6, 0]} rotation={[0, 0, -0.2]}>
                <boxGeometry args={[0.2, 0.6, 0.2]} />
                <meshStandardMaterial color="#1A1A1A" metalness={0.3} roughness={0.7} />
            </mesh>

            {/* Right Arm */}
            <mesh position={[0.45, 0.6, 0]} rotation={[0, 0, 0.2]}>
                <boxGeometry args={[0.2, 0.6, 0.2]} />
                <meshStandardMaterial color="#1A1A1A" metalness={0.3} roughness={0.7} />
            </mesh>

            {/* Legs */}
            <mesh position={[-0.15, -0.1, 0]}>
                <boxGeometry args={[0.25, 0.6, 0.25]} />
                <meshStandardMaterial color="#1A1A1A" metalness={0.3} roughness={0.7} />
            </mesh>
            <mesh position={[0.15, -0.1, 0]}>
                <boxGeometry args={[0.25, 0.6, 0.25]} />
                <meshStandardMaterial color="#1A1A1A" metalness={0.3} roughness={0.7} />
            </mesh>

            {/* Laptop (in front - cyan screen) */}
            <mesh position={[0, 0.5, 0.35]} rotation={[-0.3, 0, 0]}>
                <boxGeometry args={[0.4, 0.02, 0.3]} />
                <meshStandardMaterial color="#333333" />
            </mesh>
            {/* Laptop screen glow */}
            <mesh position={[0, 0.52, 0.35]} rotation={[-0.3, 0, 0]}>
                <boxGeometry args={[0.35, 0.01, 0.25]} />
                <meshStandardMaterial
                    color="#00D4AA"
                    emissive="#00D4AA"
                    emissiveIntensity={0.8}
                />
            </mesh>

            {/* Point light for character glow */}
            <pointLight position={[0, 1, 1]} intensity={0.5} color="#00D4AA" distance={3} />
        </group>
    );
}
