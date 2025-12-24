"use client";

import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Billboard, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface NinjaSpriteProps {
    /** Scale of the character (default 2.5) */
    scale?: number;
    /** Enable idle bobbing animation */
    enableIdleAnimation?: boolean;
    /** Enable cyan glow effect */
    enableGlow?: boolean;
    /** Movement direction for lean effect (-1 to 1) */
    moveDirection?: { x: number; z: number };
}

/**
 * NinjaSprite - Billboard sprite character that always faces camera
 * 
 * Features:
 * - Always faces camera (billboard)
 * - Subtle idle bob animation
 * - Fake circular shadow
 * - Cyan glow effect
 * - Lean towards movement direction
 * 
 * Upgrade path: Can be replaced with 3D model without changing controller
 */
export default function NinjaSprite({
    scale = 2.5,
    enableIdleAnimation = true,
    enableGlow = true,
    moveDirection = { x: 0, z: 0 },
}: NinjaSpriteProps) {
    const groupRef = useRef<THREE.Group>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    // Load ninja texture
    const texture = useTexture("/images/ninja-character.png");

    // Fix texture settings for sharp rendering
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    // Idle animation + movement lean
    useFrame((state) => {
        if (!groupRef.current) return;

        // Subtle idle bob
        if (enableIdleAnimation) {
            const bobAmount = Math.sin(state.clock.elapsedTime * 2) * 0.03;
            groupRef.current.position.y = bobAmount;
        }

        // Lean towards movement direction (subtle)
        const targetRotationZ = -moveDirection.x * 0.1;
        groupRef.current.rotation.z = THREE.MathUtils.lerp(
            groupRef.current.rotation.z,
            targetRotationZ,
            0.1
        );

        // Pulse glow effect
        if (glowRef.current && enableGlow) {
            const pulseIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
            (glowRef.current.material as THREE.MeshBasicMaterial).opacity = pulseIntensity;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Character sprite (billboard) */}
            <Billboard
                follow={true}
                lockX={false}
                lockY={false}
                lockZ={false}
            >
                <mesh position={[0, scale / 2, 0]}>
                    <planeGeometry args={[scale, scale]} />
                    <meshBasicMaterial
                        map={texture}
                        transparent
                        alphaTest={0.1}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                {/* Cyan glow behind character */}
                {enableGlow && (
                    <mesh ref={glowRef} position={[0, scale / 2, -0.1]}>
                        <planeGeometry args={[scale * 1.3, scale * 1.3]} />
                        <meshBasicMaterial
                            color="#00D4AA"
                            transparent
                            opacity={0.3}
                            blending={THREE.AdditiveBlending}
                        />
                    </mesh>
                )}
            </Billboard>

            {/* Fake circular shadow on ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
                <circleGeometry args={[0.6, 32]} />
                <meshBasicMaterial
                    color="#000000"
                    transparent
                    opacity={0.4}
                />
            </mesh>

            {/* Character point light for subtle illumination */}
            <pointLight
                position={[0, scale / 2, 0.5]}
                intensity={0.5}
                color="#00D4AA"
                distance={4}
            />
        </group>
    );
}

/**
 * DirectionalNinjaSprite - Shows different views based on movement
 * 
 * This is an upgrade from the basic billboard. It uses a sprite sheet
 * with front/back/side views and switches based on camera angle.
 * 
 * Requirements:
 * - Sprite sheet with: front, back, left, right views
 * - Each frame same size, arranged horizontally
 * 
 * TODO: Implement when sprite sheet is provided
 */
export function DirectionalNinjaSprite() {
    // Placeholder for future implementation
    return <NinjaSprite />;
}
