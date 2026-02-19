import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function BodyContourScene() {
  const waveRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (waveRef.current && waveRef.current.geometry) {
      const positions = waveRef.current.geometry.attributes.position;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const wave1 = Math.sin(x * 2 + t) * 0.1;
        const wave2 = Math.sin(y * 2 + t * 1.5) * 0.1;
        positions.setZ(i, wave1 + wave2);
      }
      
      positions.needsUpdate = true;
      waveRef.current.geometry.computeVertexNormals();
      waveRef.current.rotation.z = t * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} intensity={1} />
      <pointLight position={[-3, -3, 0]} intensity={0.5} color="#C6A87D" />

      <mesh ref={waveRef} rotation={[-Math.PI / 4, 0, 0]}>
        <planeGeometry args={[3, 3, 32, 32]} />
        <meshStandardMaterial
          color="#E8DFD8"
          metalness={0.2}
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}
