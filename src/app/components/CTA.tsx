import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { SerumDroplets } from './three/SerumDroplets';
import { Calendar, Phone, Mail } from 'lucide-react';
import { usePerformanceMode } from '../hooks/usePerformanceMode';

export function CTA() {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const { shouldReduce3D, shouldSimplify3D } = usePerformanceMode();
  const [activeButton, setActiveButton] = useState<'book' | 'contact' | null>(null);

  const activateButton = (key: 'book' | 'contact') => {
    setActiveButton(key);
    window.setTimeout(() => {
      setActiveButton((current) => (current === key ? null : current));
    }, 420);
  };

  return (
    <section ref={ref} className="relative py-20 md:py-24 px-6 bg-gradient-to-br from-[#CFC6BE] via-[#E8DFD8] to-[#F7F4F1] overflow-hidden">
      {/* 3D Background with Large Droplet Mask */}
      <div className="absolute inset-0 flex items-center justify-center opacity-60">
        <motion.div
          initial={{ clipPath: 'circle(0% at 50% 50%)' }}
          animate={isInView ? { clipPath: 'circle(50% at 50% 50%)' } : {}}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="w-full h-full"
        >
          {!shouldReduce3D && isInView ? (
            <Canvas
              camera={{ position: [0, 0, 6], fov: 50 }}
              dpr={1}
              frameloop="demand"
              gl={{ antialias: !shouldSimplify3D, powerPreference: 'high-performance' }}
              style={{ pointerEvents: 'none' }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <pointLight position={[-5, -5, -5]} intensity={0.3} color="#C6A87D" />
              <SerumDroplets />
              <Environment preset="studio" />
            </Canvas>
          ) : null}
        </motion.div>
      </div>
      {shouldReduce3D ? (
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="ambient-blob-a absolute top-10 -left-16 w-64 h-64 rounded-full bg-[#C6A87D]/30 blur-3xl" />
          <div className="ambient-blob-b absolute bottom-0 -right-12 w-72 h-72 rounded-full bg-[#F5E8DC]/70 blur-3xl" />
        </div>
      ) : null}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight">
            Feel Confident<br />
            <span className="italic text-[#C6A87D]">In Your Skin</span>
          </h2>
          <p className="text-lg md:text-xl text-[#6B6661] mb-12 max-w-2xl mx-auto">
            Book your personalized aesthetic consultation today and begin your journey 
            to natural, refined beauty.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97, backgroundColor: '#C6A87D' }}
              onTapStart={() => activateButton('book')}
              onClick={() => activateButton('book')}
              className={`w-full sm:w-auto px-10 py-5 rounded-full uppercase tracking-wider text-sm transition-colors duration-300 flex items-center justify-center gap-3 ${
                activeButton === 'book'
                  ? 'bg-[#C6A87D] text-[#F7F4F1]'
                  : 'bg-[#2D2A26] text-[#F7F4F1] hover:bg-[#C6A87D] active:bg-[#C6A87D]'
              }`}
            >
              <Calendar className="w-5 h-5" />
              Book Appointment
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97, backgroundColor: '#2D2A26', color: '#F7F4F1' }}
              onTapStart={() => activateButton('contact')}
              onClick={() => activateButton('contact')}
              className={`w-full sm:w-auto px-10 py-5 border-2 rounded-full uppercase tracking-wider text-sm transition-all duration-300 flex items-center justify-center gap-3 ${
                activeButton === 'contact'
                  ? 'border-[#2D2A26] bg-[#2D2A26] text-[#F7F4F1]'
                  : 'border-[#2D2A26] text-[#2D2A26] hover:bg-[#2D2A26] hover:text-[#F7F4F1] active:bg-[#2D2A26] active:text-[#F7F4F1]'
              }`}
            >
              <Phone className="w-5 h-5" />
              Contact Clinic
            </motion.button>
          </div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center text-[#6B6661]"
          >
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#C6A87D]" />
              <span>(555) 123-4567</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-[#C6A87D]/30" />
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#C6A87D]" />
              <span>hello@trueaesthetic.com</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
