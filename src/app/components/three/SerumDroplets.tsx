import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function SerumDroplets() {
  const groupRef = useRef<THREE.Group>(null);
  
  const droplets = useMemo(() => {
    const data = [];
    for (let i = 0; i < 15; i++) {
      data.push({
        position: [
          (Math.random() - 0.5) * 2,
          Math.random() * 3 - 1,
          (Math.random() - 0.5) * 2
        ] as [number, number, number],
        scale: Math.random() * 0.3 + 0.2,
        delay: Math.random() * Math.PI * 2
      });
    }
    return data;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const droplet = droplets[i];
        child.position.y = Math.sin(state.clock.elapsedTime * 0.6 + droplet.delay) * 0.5 + droplet.position[1];
      });
    }
  });

  return (
    <group ref={groupRef}>
      {droplets.map((droplet, i) => (
        <mesh key={i} position={droplet.position} scale={droplet.scale}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshPhysicalMaterial
            color="#C6A87D"
            transparent
            opacity={0.9}
            transmission={0.98}
            thickness={0.3}
            roughness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}