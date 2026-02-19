import { motion } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { FacialMeshScene } from '../3d-scenes/FacialMeshScene';
import { GelScene } from '../3d-scenes/GelScene';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F7F4F1] via-[#E8DFD8] to-[#F7F4F1]">
      {/* 3D Background with mask */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="w-full h-full max-w-2xl max-h-2xl"
          style={{
            clipPath: 'ellipse(40% 50% at 50% 50%)',
          }}
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <FacialMeshScene />
            <GelScene />
          </Canvas>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="serif text-5xl md:text-7xl lg:text-8xl mb-6 text-[#2C2C2C] tracking-tight"
          style={{ fontWeight: 300 }}
        >
          Authentic Beauty.
          <br />
          <span style={{ fontWeight: 400 }}>Expertly Refined.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-lg md:text-xl text-[#2C2C2C]/80 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Where medical precision meets artistic aesthetics to enhance your natural features — never overdone.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="px-8 py-4 bg-[#C6A87D] text-white uppercase tracking-widest text-sm hover:bg-[#b89770] transition-all duration-300 shadow-lg hover:shadow-xl rounded-sm">
            Book Consultation
          </button>
          <button className="px-8 py-4 border-2 border-[#C6A87D] text-[#2C2C2C] uppercase tracking-widest text-sm hover:bg-[#C6A87D] hover:text-white transition-all duration-300 rounded-sm">
            Explore Treatments
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-[#C6A87D] rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-[#C6A87D] rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
