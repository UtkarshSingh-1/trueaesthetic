import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FacialContour() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0.3, 0, 0]}>
      <torusGeometry args={[1.5, 0.6, 32, 100]} />
      <meshStandardMaterial
        color="#E8DFD8"
        roughness={0.2}
        metalness={0.1}
        transparent
        opacity={0.7}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
