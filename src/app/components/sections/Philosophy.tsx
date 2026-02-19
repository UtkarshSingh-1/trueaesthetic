import { motion } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { CollagenScene } from '../3d-scenes/CollagenScene';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function Philosophy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 px-6 bg-[#F7F4F1]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
          style={{
            clipPath: isInView ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' : 'polygon(0 0, 0 0, 0 100%, 0 100%)',
          }}
        >
          <h2 className="serif text-4xl md:text-6xl mb-8 text-[#2C2C2C]" style={{ fontWeight: 300 }}>
            Aesthetic Care
            <br />
            <span style={{ fontWeight: 400 }}>Designed Around You</span>
          </h2>
          
          <p className="text-lg text-[#2C2C2C]/80 mb-8 leading-relaxed">
            We believe aesthetic treatments should feel personal, safe, and naturally beautiful. Every plan is tailored to your features, goals, and skin biology — blending science, artistry, and clinical expertise.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-12">
            {[
              { title: 'Safety-First', icon: '✓' },
              { title: 'Natural Results', icon: '✓' },
              { title: 'Personalized Care', icon: '✓' },
              { title: 'Evidence-Based', icon: '✓' },
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#C6A87D]/20 flex items-center justify-center text-[#C6A87D] flex-shrink-0">
                  {pillar.icon}
                </div>
                <span className="text-[#2C2C2C] font-medium">{pillar.title}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: 3D Scene with blob mask */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2 }}
          className="relative h-[500px] md:h-[600px]"
        >
          <div
            className="w-full h-full"
            style={{
              clipPath: 'ellipse(45% 40% at 50% 50%)',
              background: 'linear-gradient(135deg, rgba(232, 223, 216, 0.5) 0%, rgba(247, 244, 241, 0.3) 100%)',
            }}
          >
            <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
              <CollagenScene />
            </Canvas>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
