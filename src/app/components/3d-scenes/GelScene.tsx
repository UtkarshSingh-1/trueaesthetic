import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function GelScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mesh2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.1;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
      meshRef.current.rotation.y = t * 0.1;
    }
    if (mesh2Ref.current) {
      mesh2Ref.current.position.y = Math.cos(t * 0.4 + 1) * 0.08;
      mesh2Ref.current.rotation.y = -t * 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#C6A87D" />

      {/* Main gel form */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          color="#E8DFD8"
          transparent
          opacity={0.7}
          transmission={0.9}
          thickness={0.5}
          roughness={0.1}
        />
      </mesh>

      {/* Secondary gel cushion */}
      <mesh ref={mesh2Ref} position={[0.5, -0.3, -0.5]} scale={0.7}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          color="#CFC6BE"
          transparent
          opacity={0.7}
          transmission={0.85}
          thickness={0.4}
          roughness={0.15}
        />
      </mesh>
    </>
  );
}