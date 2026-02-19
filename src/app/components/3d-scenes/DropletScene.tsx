import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function DropletScene() {
  const droplet1 = useRef<THREE.Mesh>(null);
  const droplet2 = useRef<THREE.Mesh>(null);
  const droplet3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (droplet1.current) {
      droplet1.current.position.y = Math.sin(t * 0.8) * 0.3;
      droplet1.current.rotation.y = t * 0.2;
    }
    if (droplet2.current) {
      droplet2.current.position.y = Math.sin(t * 0.6 + 1) * 0.25 - 0.3;
      droplet2.current.rotation.y = -t * 0.15;
    }
    if (droplet3.current) {
      droplet3.current.position.y = Math.sin(t * 0.7 + 2) * 0.2 + 0.2;
      droplet3.current.rotation.y = t * 0.25;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[-5, -5, 0]} intensity={0.8} color="#C6A87D" />

      {/* Main droplet */}
      <mesh ref={droplet1} position={[0, 0, 0]} scale={[0.4, 0.5, 0.4]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          color="#b8e0f5"
          transparent
          opacity={0.8}
          transmission={0.95}
          thickness={0.3}
          roughness={0.05}
        />
      </mesh>

      {/* Secondary droplet */}
      <mesh ref={droplet2} position={[-0.4, -0.3, -0.2]} scale={[0.25, 0.3, 0.25]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          color="#d4e8f5"
          transparent
          opacity={0.8}
          transmission={0.9}
          thickness={0.2}
          roughness={0.1}
        />
      </mesh>

      {/* Tertiary droplet */}
      <mesh ref={droplet3} position={[0.3, 0.2, 0.3]} scale={[0.2, 0.25, 0.2]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          color="#C6A87D"
          transparent
          opacity={0.8}
          transmission={0.92}
          thickness={0.15}
          roughness={0.08}
        />
      </mesh>
    </>
  );
}