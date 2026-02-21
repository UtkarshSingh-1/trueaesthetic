import { Canvas } from '@react-three/fiber';
import { motion } from 'motion/react';
import { useState } from 'react';
import { FacialContour } from './three/FacialContour';
import { GelForm } from './three/GelForm';
import { usePerformanceMode } from '../hooks/usePerformanceMode';
import { useInView } from '../hooks/useInView';
import { scrollToSection } from '../utils/scroll';
import { useNavigate } from 'react-router';

export function Hero() {
  const { ref: canvasRef, isInView: isCanvasInView } = useInView({ threshold: 0, once: false });
  const { shouldReduce3D, shouldSimplify3D } = usePerformanceMode();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<'book' | 'explore' | null>(null);

  const activateButton = (key: 'book' | 'explore') => {
    setActiveButton(key);
    window.setTimeout(() => {
      setActiveButton((current) => (current === key ? null : current));
    }, 420);
  };

  const handleBook = () => {
    activateButton('book');
    setTimeout(() => navigate('/book'), 150);
  };

  const handleExplore = () => {
    activateButton('explore');
    setTimeout(() => scrollToSection('treatments'), 150);
  };

  return (
    <section className="relative min-h-screen pt-28 sm:pt-32 md:pt-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F7F4F1] via-[#E8DFD8] to-[#F5E8DC]">
      {/* 3D Background with Mask */}
      <div ref={canvasRef} className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="w-full h-full"
        >
          {!shouldSimplify3D && isCanvasInView ? (
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              dpr={1}
              gl={{ antialias: false, powerPreference: 'high-performance' }}
              style={{ pointerEvents: 'none' }}
            >
              <ambientLight intensity={0.6} />
              <hemisphereLight args={['#fff7ef', '#c7b8a6', 0.55]} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <pointLight position={[-5, -5, -5]} intensity={0.3} color="#C6A87D" />
              <FacialContour />
              <GelForm />
            </Canvas>
          ) : null}
        </motion.div>
      </div>
      {/* Mobile / reduced-motion / off-screen fallback */}
      {shouldSimplify3D || !isCanvasInView ? (
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
          <div className="mobile-orb-float absolute -top-10 -left-16 w-72 h-72 rounded-full bg-[#C6A87D]/25 blur-3xl text-red-500" />
          <div className="mobile-orb-float-alt absolute -bottom-12 -right-12 w-80 h-80 rounded-full bg-[#E8DFD8]/60 blur-3xl text-blue-500" />
          <div className="mobile-orb-float absolute top-1/4 right-1/4 w-48 h-48 rounded-full bg-[#C6A87D]/20 blur-3xl opacity-60" style={{ animationDelay: '1.5s' }} />
        </div>
      ) : null}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.14 }}
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
              onClick={handleBook}
              className={`w-full sm:w-auto px-8 py-4 rounded-full uppercase tracking-wider text-sm transition-colors duration-300 ${activeButton === 'book'
                ? 'bg-[#C6A87D] text-[#F7F4F1]'
                : 'bg-[#2D2A26] text-[#F7F4F1] hover:bg-[#C6A87D] active:bg-[#C6A87D]'
                }`}
            >
              Book Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97, backgroundColor: '#C6A87D', color: '#F7F4F1' }}
              onClick={handleExplore}
              className={`w-full sm:w-auto px-8 py-4 border-2 rounded-full uppercase tracking-wider text-sm transition-all duration-300 ${activeButton === 'explore'
                ? 'border-[#C6A87D] bg-[#C6A87D] text-[#F7F4F1]'
                : 'border-[#C6A87D] text-[#2D2A26] hover:bg-[#C6A87D] hover:text-[#F7F4F1] active:bg-[#C6A87D] active:text-[#F7F4F1]'
                }`}
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
        transition={{ delay: 0.75, duration: 0.55 }}
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
