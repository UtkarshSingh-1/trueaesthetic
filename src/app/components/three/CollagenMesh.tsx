import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CollagenMesh() {
  const meshRef = useRef<THREE.Group>(null);
  
  // Create fiber network
  const fibers = useMemo(() => {
    const fiberData = [];
    for (let i = 0; i < 40; i++) {
      const points = [];
      const startX = (Math.random() - 0.5) * 3;
      const startY = (Math.random() - 0.5) * 3;
      const startZ = (Math.random() - 0.5) * 3;
      
      for (let j = 0; j < 10; j++) {
        points.push(
          new THREE.Vector3(
            startX + Math.sin(j * 0.5) * 0.3,
            startY + j * 0.15,
            startZ + Math.cos(j * 0.5) * 0.3
          )
        );
      }
      fiberData.push(points);
    }
    return fiberData;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {fibers.map((points, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={points.length}
              array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#C6A87D" opacity={0.6} transparent linewidth={2} />
        </line>
      ))}
      
      {/* Glowing nodes at connections */}
      {fibers.map((points, i) => (
        <mesh key={`node-${i}`} position={points[0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#C6A87D" opacity={0.8} transparent />
        </mesh>
      ))}
    </group>
  );
}
