import { motion } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { DropletScene } from '../3d-scenes/DropletScene';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-40 px-6 bg-gradient-to-br from-[#E8DFD8] to-[#F7F4F1] overflow-hidden">
      {/* 3D Background with circular mask */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="w-full h-full max-w-3xl"
          style={{
            clipPath: 'circle(30% at 50% 50%)',
            opacity: 0.6,
          }}
        >
          <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
            <DropletScene />
          </Canvas>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="serif text-5xl md:text-7xl mb-8 text-[#2C2C2C]"
          style={{ fontWeight: 300 }}
        >
          Feel Confident
          <br />
          <span style={{ fontWeight: 400 }}>In Your Skin</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-xl text-[#2C2C2C]/80 mb-12 leading-relaxed"
        >
          Book your personalized aesthetic consultation today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="px-10 py-5 bg-[#C6A87D] text-white uppercase tracking-widest text-sm hover:bg-[#b89770] transition-all duration-300 shadow-xl hover:shadow-2xl rounded-sm hover:scale-105">
            Book Appointment
          </button>
          <button className="px-10 py-5 border-2 border-[#C6A87D] text-[#2C2C2C] uppercase tracking-widest text-sm hover:bg-[#C6A87D] hover:text-white transition-all duration-300 rounded-sm">
            Contact Clinic
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 text-sm text-[#2C2C2C]/60"
        >
          New patient consultations available Monday – Saturday
        </motion.p>
      </div>
    </section>
  );
}
