import { motion } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { GelScene } from '../3d-scenes/GelScene';
import { CollagenScene } from '../3d-scenes/CollagenScene';
import { FollicleScene } from '../3d-scenes/FollicleScene';
import { DropletScene } from '../3d-scenes/DropletScene';
import { BodyContourScene } from '../3d-scenes/BodyContourScene';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Syringe, Sparkles, Scissors, Droplet, Activity } from 'lucide-react';

const treatments = [
  {
    title: 'Injectables',
    description: 'Dermal fillers & neuromodulators for natural enhancement',
    icon: Syringe,
    Scene: GelScene,
  },
  {
    title: 'Skin Rejuvenation',
    description: 'Advanced treatments for radiant, youthful skin',
    icon: Sparkles,
    Scene: CollagenScene,
  },
  {
    title: 'Hair Restoration',
    description: 'Medical solutions for hair growth & density',
    icon: Scissors,
    Scene: FollicleScene,
  },
  {
    title: 'IV Wellness',
    description: 'Nutrient infusions for health & vitality',
    icon: Droplet,
    Scene: DropletScene,
  },
  {
    title: 'Body Contouring',
    description: 'Non-surgical sculpting & toning treatments',
    icon: Activity,
    Scene: BodyContourScene,
  },
];

export function Treatments() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-32 px-6 bg-[#E8DFD8]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="serif text-4xl md:text-6xl mb-6 text-[#2C2C2C]" style={{ fontWeight: 300 }}>
            Tailored <span style={{ fontWeight: 400 }}>Treatments</span>
          </h2>
          <p className="text-lg text-[#2C2C2C]/70 max-w-2xl mx-auto">
            Expert aesthetic services designed to enhance your natural beauty
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatments.map((treatment, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative"
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* 3D Scene Container with mask */}
                <div className="relative h-64 overflow-hidden">
                  <motion.div
                    animate={{
                      clipPath: hoveredIndex === i
                        ? 'circle(70% at 50% 50%)'
                        : 'circle(40% at 50% 50%)',
                    }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full bg-gradient-to-br from-[#F7F4F1] to-[#E8DFD8]"
                  >
                    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                      <treatment.Scene />
                    </Canvas>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#C6A87D]/20 flex items-center justify-center">
                      <treatment.icon className="w-5 h-5 text-[#C6A87D]" />
                    </div>
                    <h3 className="text-2xl text-[#2C2C2C] font-medium">{treatment.title}</h3>
                  </div>
                  <p className="text-[#2C2C2C]/70 leading-relaxed">{treatment.description}</p>
                  
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="mt-6 text-[#C6A87D] uppercase tracking-wider text-sm font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all"
                  >
                    Learn More
                    <span>→</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}