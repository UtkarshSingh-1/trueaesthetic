import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FacialMeshScene() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1;
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.05;
      
      // Subtle breathing effect
      const scale = 1 + Math.sin(t * 0.5) * 0.02;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-5, 0, -5]} intensity={0.5} color="#C6A87D" />

      <mesh ref={meshRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshPhysicalMaterial
          color="#E8DFD8"
          metalness={0.1}
          roughness={0.4}
          transmission={0.1}
          thickness={0.5}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh rotation={[0, 0, 0]}>
        <sphereGeometry args={[1.21, 16, 16]} />
        <meshBasicMaterial color="#C6A87D" wireframe opacity={0.3} transparent />
      </mesh>
    </>
  );
}
