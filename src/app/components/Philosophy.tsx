import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { motion } from 'motion/react';
import { Suspense } from 'react';
import { CollagenMesh } from './three/CollagenMesh';
import { useInView } from '../hooks/useInView';
import { Check } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';
import { usePerformanceMode } from '../hooks/usePerformanceMode';

export function Philosophy() {
  const { ref: canvasRef, isInView: isCanvasInView } = useInView({ threshold: 0, once: false });
  const { shouldSimplify3D } = usePerformanceMode();

  const pillars = [
    'Safety-First',
    'Natural Results',
    'Personalized Care',
    'Evidence-Based'
  ];

  return (
    <section className="min-h-screen py-20 md:py-24 px-6 bg-[#F7F4F1] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
              whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, delay: 0.12 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight">
                Aesthetic Care<br />
                <span className="italic">Designed Around You</span>
              </h2>
            </motion.div>

            <p className="text-lg text-[#6B6661] leading-relaxed">
              We believe aesthetic treatments should feel personal, safe, and naturally beautiful.
              Every plan is tailored to your features, goals, and skin biology — blending science,
              artistry, and clinical expertise.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-8">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.38, delay: 0.16 + index * 0.05 }}
                  className="flex items-center gap-3 p-4 bg-white/50 rounded-2xl backdrop-blur-sm border border-[#C6A87D]/20"
                >
                  <div className="w-8 h-8 rounded-full bg-[#C6A87D]/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-[#C6A87D]" />
                  </div>
                  <span className="text-[#2D2A26]">{pillar}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: 3D Collagen Mesh with Organic Blob Mask */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="relative h-[600px] hidden lg:block"
          >
            <motion.div
              ref={canvasRef}
              initial={{ clipPath: 'circle(0% at 50% 50%)' }}
              whileInView={{ clipPath: 'circle(70% at 50% 50%)' }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute inset-0 rounded-[40%] overflow-hidden bg-gradient-to-br from-[#E8DFD8] to-[#CFC6BE]"
            >
              {!shouldSimplify3D && isCanvasInView ? (
                <Canvas
                  camera={{ position: [0, 0, 5], fov: 50 }}
                  dpr={1}
                  frameloop="always"
                  gl={{ antialias: false, powerPreference: 'high-performance' }}
                  style={{ pointerEvents: 'none' }}
                >
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[5, 5, 5]} intensity={1} />
                  <pointLight position={[-5, -5, -5]} intensity={0.4} color="#C6A87D" />
                  <Suspense fallback={<LoadingSpinner />}>
                    <CollagenMesh />
                  </Suspense>
                  <Environment preset="studio" />
                </Canvas>
              ) : (
                <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
                  <div className="mobile-orb-float absolute -top-10 -left-16 w-72 h-72 rounded-full bg-[#C6A87D]/25 blur-3xl text-red-500" />
                  <div className="mobile-orb-float-alt absolute -bottom-12 -right-12 w-80 h-80 rounded-full bg-[#E8DFD8]/60 blur-3xl text-blue-500" />
                  <div className="mobile-orb-float absolute top-1/4 right-1/4 w-48 h-48 rounded-full bg-[#C6A87D]/20 blur-3xl opacity-60" style={{ animationDelay: '1.5s' }} />
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
