import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FollicleScene() {
  const groupRef = useRef<THREE.Group>(null);

  const follicles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2;
      const radius = 0.5 + Math.random() * 0.3;
      temp.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        height: 0.3 + Math.random() * 0.5,
        delay: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={1} color="#C6A87D" />

      <group ref={groupRef}>
        {follicles.map((follicle, i) => (
          <group key={i} position={[follicle.x, 0, follicle.z]}>
            {/* Follicle base */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial color="#CFC6BE" />
            </mesh>
            
            {/* Hair strand */}
            <mesh position={[0, follicle.height / 2, 0]} rotation={[0.1, 0, 0]}>
              <cylinderGeometry args={[0.01, 0.015, follicle.height, 4]} />
              <meshStandardMaterial color="#8B7355" />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
}
