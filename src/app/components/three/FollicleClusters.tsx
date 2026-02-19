import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FollicleClusters() {
  const groupRef = useRef<THREE.Group>(null);
  
  const follicles = useMemo(() => {
    const data = [];
    for (let i = 0; i < 30; i++) {
      data.push({
        position: [
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ] as [number, number, number],
        height: Math.random() * 0.5 + 0.3
      });
    }
    return data;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {follicles.map((follicle, i) => (
        <group key={i} position={follicle.position}>
          {/* Follicle base */}
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#C6A87D" />
          </mesh>
          {/* Hair strand */}
          <mesh position={[0, follicle.height / 2, 0]}>
            <cylinderGeometry args={[0.01, 0.02, follicle.height, 8]} />
            <meshStandardMaterial color="#2D2A26" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
