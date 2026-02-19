import { motion } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { CollagenScene } from '../3d-scenes/CollagenScene';
import { useInView } from 'motion/react';
import { useRef } from 'react';

const outcomes = [
  'More Refreshed',
  'More Balanced',
  'More Radiant',
  'More Confident',
];

export function Results() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden bg-[#F7F4F1]">
      {/* Background 3D with expanding mask */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="w-full h-full max-w-4xl"
          style={{
            clipPath: 'ellipse(35% 40% at 50% 50%)',
            opacity: 0.4,
          }}
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <CollagenScene />
          </Canvas>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="serif text-4xl md:text-6xl mb-6 text-[#2C2C2C]"
          style={{ fontWeight: 300 }}
        >
          Results That Feel
          <br />
          <span style={{ fontWeight: 400 }}>Like You</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 mt-20 max-w-3xl mx-auto">
          {outcomes.map((outcome, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
              className="relative"
            >
              <div className="p-8 rounded-2xl bg-white/40 backdrop-blur-sm border border-[#C6A87D]/20 hover:border-[#C6A87D]/40 transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#C6A87D]/30 to-[#C6A87D]/10 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-[#C6A87D]/60 animate-pulse" />
                </div>
                <h3 className="text-2xl md:text-3xl serif text-[#2C2C2C]" style={{ fontWeight: 400 }}>
                  {outcome}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
