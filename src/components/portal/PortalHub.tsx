"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, Mesh } from "three";
import NinjaCharacter from "./NinjaCharacter";

// Grid Floor Component with animation
function GridFloor() {
    const meshRef = useRef<Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
            meshRef.current.scale.set(scale, scale, 1);
        }
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[50, 50, 50, 50]} />
            <meshBasicMaterial color="#00D4AA" wireframe transparent opacity={0.15} />
        </mesh>
    );
}

// Floating Particles with animation
function FloatingParticles() {
    const pointsRef = useRef<Points>(null);
    const particleCount = 200;

    const positions = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 1] = Math.random() * 15;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
            pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                color="#00FF88"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

// Main Scene
function Scene() {
    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.8} color="#00D4AA" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF006E" />
            <spotLight
                position={[0, 10, 0]}
                angle={0.3}
                penumbra={1}
                intensity={0.5}
                color="#00D4AA"
                castShadow
            />
            <Stars radius={300} depth={60} count={5000} factor={7} saturation={0} fade speed={1} />
            <GridFloor />
            <NinjaCharacter position={[0, 0, 0]} />
            <FloatingParticles />
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 4}
                autoRotate
                autoRotateSpeed={0.5}
            />
        </>
    );
}

// Portal Hub - 3D Background Only (state managed by PortalModeContainer)
export default function PortalHub() {
    return (
        <div className="w-full h-screen bg-black">
            <Canvas
                camera={{ position: [0, 2, 8], fov: 60 }}
                className="w-full h-full"
                gl={{ antialias: true, alpha: false }}
            >
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>

            {/* UI Overlay */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />
                <div className="absolute top-8 left-0 right-0 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                        Welcome to the <span className="text-accent-primary">Portal</span>
                    </h1>
                </div>
                <div className="absolute bottom-8 left-0 right-0 text-center">
                    <p className="text-foreground-secondary text-sm">
                        🖱️ Click and drag to rotate • Click the Ninja to interact! 👆
                    </p>
                </div>
            </div>
        </div>
    );
}
