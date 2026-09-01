"use client";
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, Preload } from '@react-three/drei';

export default function Hero3DScene({ children }) {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 0, 2]} color="#FF6B00" intensity={3} distance={20} />
        <pointLight position={[-5, 5, 5]} color="#112244" intensity={1} />
        
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            {children}
          </Float>
          <Environment preset="city" />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
