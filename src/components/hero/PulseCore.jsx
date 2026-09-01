"use client";
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function PulseCore() {
  const groupRef = useRef();
  const orbRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // Rotate entire group slowly
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      
      // Mouse Parallax
      const targetX = (state.mouse.x * Math.PI) / 10;
      const targetY = (state.mouse.y * Math.PI) / 10;
      groupRef.current.rotation.y += 0.05 * (targetX - groupRef.current.rotation.y);
      groupRef.current.rotation.x += 0.05 * (targetY - groupRef.current.rotation.x);
    }
    
    // Pulsing effect on the orb
    if (orbRef.current) {
      orbRef.current.distort = 0.3 + Math.sin(time * 2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Pulse Orb */}
      <Sphere args={[2, 64, 64]}>
        <MeshDistortMaterial
          ref={orbRef}
          color="#000000"
          emissive="#FF6B00"
          emissiveIntensity={1.5}
          wireframe={true}
          speed={2}
          distort={0.4}
        />
      </Sphere>

      {/* Solid Inner Core */}
      <Sphere args={[1.8, 32, 32]}>
        <meshStandardMaterial color="#111111" roughness={0.1} metalness={0.8} />
      </Sphere>

      {/* Elegant Circular Rings */}
      {[1, 2, 3].map((ring, index) => (
        <Torus 
          key={index} 
          args={[3 + index * 0.8, 0.01, 16, 100]} 
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        >
          <meshBasicMaterial color="#FF6B00" transparent opacity={0.3 - index * 0.1} />
        </Torus>
      ))}

      {/* Floating Particles/Nodes */}
      {Array.from({ length: 15 }).map((_, i) => {
        const radius = 5 + Math.random() * 2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        return (
          <mesh key={i} position={[x, y, z]}>
            {Math.random() > 0.5 ? <boxGeometry args={[0.3, 0.3, 0.3]} /> : <octahedronGeometry args={[0.2]} />}
            <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} transparent opacity={0.5} />
          </mesh>
        );
      })}
    </group>
  );
}
