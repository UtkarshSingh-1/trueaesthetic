import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function GelForm() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Slow floating breathing animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y += 0.002;
      
      // Subtle scale breathing
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshPhysicalMaterial
        color="#F5E8DC"
        transparent
        opacity={0.8}
        transmission={0.95}
        thickness={0.5}
        roughness={0.1}
      />
    </mesh>
  );
}