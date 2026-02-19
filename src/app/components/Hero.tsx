import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { motion } from 'motion/react';
import { Suspense } from 'react';
import { FacialContour } from './three/FacialContour';
import { GelForm } from './three/GelForm';
import { LoadingSpinner } from './LoadingSpinner';
import { usePerformanceMode } from '../hooks/usePerformanceMode';

export function Hero() {
  const { shouldReduce3D } = usePerformanceMode();

  return (
    <section className="relative min-h-screen pt-28 sm:pt-32 md:pt-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F7F4F1] via-[#E8DFD8] to-[#F5E8DC]">
      {/* 3D Background with Mask */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <Suspense fallback={<LoadingSpinner />}>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              dpr={shouldReduce3D ? 1 : [1, 1.5]}
              gl={{ antialias: !shouldReduce3D, powerPreference: 'high-performance' }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <pointLight position={[-5, -5, -5]} intensity={0.3} color="#C6A87D" />
              <FacialContour />
              <GelForm />
              <Environment preset="studio" />
            </Canvas>
          </Suspense>
        </motion.div>
      </div>
      {shouldReduce3D ? (
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="ambient-blob-a absolute -top-10 -left-16 w-72 h-72 rounded-full bg-[#C6A87D]/25 blur-3xl" />
          <div className="ambient-blob-b absolute -bottom-12 -right-12 w-80 h-80 rounded-full bg-[#E8DFD8]/60 blur-3xl" />
        </div>
      ) : null}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light mb-6 tracking-tight leading-[0.95]">
            Authentic Beauty.<br />
            <span className="italic">Expertly Refined.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#6B6661] max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed">
            Where medical precision meets artistic aesthetics to enhance your natural features — never overdone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97, backgroundColor: '#C6A87D' }}
              className="w-full sm:w-auto px-8 py-4 bg-[#2D2A26] text-[#F7F4F1] rounded-full uppercase tracking-wider text-sm hover:bg-[#C6A87D] active:bg-[#C6A87D] transition-colors duration-300"
            >
              Book Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97, backgroundColor: '#C6A87D', color: '#F7F4F1' }}
              className="w-full sm:w-auto px-8 py-4 border-2 border-[#C6A87D] text-[#2D2A26] rounded-full uppercase tracking-wider text-sm hover:bg-[#C6A87D] hover:text-[#F7F4F1] active:bg-[#C6A87D] active:text-[#F7F4F1] transition-all duration-300"
            >
              Explore Treatments
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-[#C6A87D] rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-[#C6A87D] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
