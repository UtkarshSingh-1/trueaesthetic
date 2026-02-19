import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CollagenScene() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      const x = (Math.random() - 0.5) * 3;
      const y = (Math.random() - 0.5) * 3;
      const z = (Math.random() - 0.5) * 3;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, []);

  const lines = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particles.length; i += 3) {
      if (Math.random() > 0.7) {
        temp.push(particles[i], particles[i + 1], particles[i + 2]);
        const j = Math.floor(Math.random() * (particles.length / 3)) * 3;
        temp.push(particles[j], particles[j + 1], particles[j + 2]);
      }
    }
    return new Float32Array(temp);
  }, [particles]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.05;
      pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.05;
      linesRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#C6A87D" />

      {/* Network nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#C6A87D" transparent opacity={0.8} />
      </points>

      {/* Network connections */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={lines.length / 3}
            array={lines}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#CFC6BE" transparent opacity={0.3} />
      </lineSegments>
    </>
  );
}
