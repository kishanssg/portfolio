"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import * as THREE from "three";
import NinjaSprite from "./NinjaSprite";

// Keyboard controls enum
export enum Controls {
    forward = "forward",
    back = "back",
    left = "left",
    right = "right",
    jump = "jump",
    interact = "interact",
}

// Controls map for KeyboardControls provider
export const controlsMap = [
    { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
    { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
    { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
    { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
    { name: Controls.jump, keys: ["Space"] },
    { name: Controls.interact, keys: ["KeyE"] },
];

// Mission portal positions (must match MissionPortals.tsx)
export const missionPositions = [
    { id: "debug-code", position: [-10, 2, -10] as [number, number, number] },
    { id: "speed-typing", position: [10, 2, -10] as [number, number, number] },
    { id: "system-design", position: [-10, 2, 10] as [number, number, number] },
    { id: "tech-quiz", position: [10, 2, 10] as [number, number, number] },
];

interface CharacterControllerProps {
    onNearPortal?: (portalId: string | null) => void;
}

export default function CharacterController({ onNearPortal }: CharacterControllerProps) {
    const bodyRef = useRef<any>(null);
    const { camera } = useThree();
    const [, get] = useKeyboardControls<Controls>();
    const [currentNearPortal, setCurrentNearPortal] = useState<string | null>(null);
    const [moveDirection, setMoveDirection] = useState({ x: 0, z: 0 });

    const [smoothCameraPosition] = useState(() => new THREE.Vector3(0, 8, 12));
    const [smoothCameraTarget] = useState(() => new THREE.Vector3());

    useFrame((state, delta) => {
        if (!bodyRef.current) return;

        const { forward, back, left, right, jump } = get();
        const velocity = bodyRef.current.linvel();
        const position = bodyRef.current.translation();

        // Movement speed
        const speed = 6;
        const direction = new THREE.Vector3();

        // Simple forward/back/left/right relative to world
        if (forward) direction.z -= 1;
        if (back) direction.z += 1;
        if (left) direction.x -= 1;
        if (right) direction.x += 1;

        direction.normalize().multiplyScalar(speed);

        // Update movement direction for sprite lean effect
        setMoveDirection({ x: direction.x / speed, z: direction.z / speed });

        // Apply movement
        bodyRef.current.setLinvel({
            x: direction.x,
            y: velocity.y,
            z: direction.z,
        });

        // Jump (only when on ground)
        if (jump && Math.abs(velocity.y) < 0.5) {
            bodyRef.current.setLinvel({ x: velocity.x, y: 8, z: velocity.z });
        }

        // Third-person camera follow
        const cameraOffset = new THREE.Vector3(0, 8, 12);
        const targetCameraPosition = new THREE.Vector3(
            position.x + cameraOffset.x,
            position.y + cameraOffset.y,
            position.z + cameraOffset.z
        );

        smoothCameraPosition.lerp(targetCameraPosition, 5 * delta);
        camera.position.copy(smoothCameraPosition);

        // Camera look at character
        smoothCameraTarget.set(position.x, position.y + 1, position.z);
        camera.lookAt(smoothCameraTarget);

        // Proximity detection for mission portals
        const proximityThreshold = 5;
        let nearestPortal: string | null = null;

        for (const mission of missionPositions) {
            const dx = position.x - mission.position[0];
            const dz = position.z - mission.position[2];
            const distance = Math.sqrt(dx * dx + dz * dz);

            if (distance < proximityThreshold) {
                nearestPortal = mission.id;
                break;
            }
        }

        // Only update if changed to avoid unnecessary re-renders
        if (nearestPortal !== currentNearPortal) {
            setCurrentNearPortal(nearestPortal);
            onNearPortal?.(nearestPortal);
        }
    });

    return (
        <RigidBody
            ref={bodyRef}
            colliders={false}
            position={[0, 3, 0]}
            enabledRotations={[false, false, false]}
            linearDamping={4}
            mass={1}
        >
            <CapsuleCollider args={[0.4, 0.4]} position={[0, 0.8, 0]} />
            {/* Custom ninja sprite character */}
            <NinjaSprite
                scale={2.2}
                enableIdleAnimation={true}
                enableGlow={true}
                moveDirection={moveDirection}
            />
        </RigidBody>
    );
}
