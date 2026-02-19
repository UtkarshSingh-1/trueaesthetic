import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { motion } from 'motion/react';
import { useInView } from '../hooks/useInView';
import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformanceMode } from '../hooks/usePerformanceMode';

function GlowingCells() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      
      // Pulsing glow effect
      groupRef.current.children.forEach((child, i) => {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.2;
        child.scale.set(scale, scale, scale);
      });
    }
  });

  const cells = useMemo(
    () =>
      Array.from({ length: 20 }, () => ({
        position: [
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3,
        ] as [number, number, number],
        scale: Math.random() * 0.2 + 0.1,
      })),
    [],
  );

  return (
    <group ref={groupRef}>
      {cells.map((cell, i) => (
        <mesh key={i} position={cell.position} scale={cell.scale}>
          <sphereGeometry args={[1, 10, 10]} />
          <meshBasicMaterial color="#C6A87D" transparent opacity={0.6} />
          <mesh scale={1.2}>
            <sphereGeometry args={[1, 10, 10]} />
            <meshBasicMaterial color="#C6A87D" transparent opacity={0.2} />
          </mesh>
        </mesh>
      ))}
    </group>
  );
}

export function Results() {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const { shouldReduce3D } = usePerformanceMode();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setActiveCard((current) => (current === index ? null : index));
  };

  const results = [
    'More Refreshed',
    'More Balanced',
    'More Radiant',
    'More Confident'
  ];

  return (
    <section ref={ref} className="relative py-20 md:py-24 px-6 bg-[#2D2A26] text-white overflow-hidden">
      {/* Background 3D with Expanding Oval Mask */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <motion.div
          initial={{ clipPath: 'ellipse(0% 0% at 50% 50%)' }}
          animate={isInView ? { clipPath: 'ellipse(60% 50% at 50% 50%)' } : {}}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="w-full h-full"
        >
          {!shouldReduce3D && isInView ? (
            <Canvas
              camera={{ position: [0, 0, 6], fov: 50 }}
              dpr={1}
              frameloop="demand"
              gl={{ antialias: false, powerPreference: 'high-performance' }}
              style={{ pointerEvents: 'none' }}
            >
              <ambientLight intensity={0.5} />
              <pointLight position={[5, 5, 5]} intensity={1} color="#C6A87D" />
              <pointLight position={[-5, -5, -5]} intensity={0.5} color="#F5E8DC" />
              <GlowingCells />
              <Environment preset="night" />
            </Canvas>
          ) : null}
        </motion.div>
      </div>
      {shouldReduce3D ? (
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="ambient-blob-a absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#C6A87D]/20 blur-3xl" />
          <div className="ambient-blob-b absolute -bottom-10 left-8 w-64 h-64 rounded-full bg-[#F5E8DC]/10 blur-3xl" />
        </div>
      ) : null}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light mb-8">
            Results That Feel<br />
            <span className="italic text-[#C6A87D]">Like You</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-16">
            Subtle enhancements that honor your unique features and natural beauty
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {results.map((result, index) => (
            <motion.div
              key={result}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.36, delay: 0.14 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.03, y: -6 }}
              onTap={() => toggleCard(index)}
              onHoverStart={() => setActiveCard(index)}
              onHoverEnd={() => setActiveCard((current) => (current === index ? null : current))}
              className="relative group"
            >
              <div
                className={`p-8 bg-white/5 backdrop-blur-sm rounded-3xl border transition-all duration-300 ${
                  activeCard === index
                    ? 'border-[#C6A87D]/60 bg-white/10 shadow-[0_0_0_1px_rgba(198,168,125,0.55)]'
                    : 'border-[#C6A87D]/20 hover:border-[#C6A87D]/50 active:border-[#C6A87D]/50 active:shadow-[0_0_0_1px_rgba(198,168,125,0.5)]'
                }`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#C6A87D] to-[#F5E8DC] flex items-center justify-center"
                >
                  <span className="text-3xl font-light text-white">{index + 1}</span>
                </motion.div>
                <h3 className="text-xl">{result}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
