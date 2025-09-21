'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProgressCubeProps {
  progress: number;
  color: string;
}

export default function ProgressCube({ progress, color }: ProgressCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={color} 
        opacity={0.7 + (progress / 100) * 0.3} 
        transparent 
      />
    </mesh>
  );
}