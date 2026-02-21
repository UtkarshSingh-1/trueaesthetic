import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { motion } from 'motion/react';
import { useInView } from '../hooks/useInView';
import { GelForm } from './three/GelForm';
import { CollagenMesh } from './three/CollagenMesh';
import { FollicleClusters } from './three/FollicleClusters';
import { SerumDroplets } from './three/SerumDroplets';
import { BodySurface } from './three/BodySurface';
import { Syringe, Sparkles, Scissors, Droplets, Waves } from 'lucide-react';
import { usePerformanceMode } from '../hooks/usePerformanceMode';
import { useState } from 'react';
import { scrollToSection } from '../utils/scroll';
import { useNavigate } from 'react-router';

interface Treatment {
  slug: string;
  title: string;
  description: string;
  icon: any;
  component: any;
}

const treatments: Treatment[] = [
  {
    slug: 'injectables',
    title: 'Injectables',
    description: 'Neurotoxins & dermal fillers for natural enhancement',
    icon: Syringe,
    component: GelForm
  },
  {
    slug: 'skin-rejuvenation',
    title: 'Skin Rejuvenation',
    description: 'Advanced treatments for texture, tone, & radiance',
    icon: Sparkles,
    component: CollagenMesh
  },
  {
    slug: 'hair-restoration',
    title: 'Hair Restoration',
    description: 'Regenerative therapies for natural hair growth',
    icon: Scissors,
    component: FollicleClusters
  },
  {
    slug: 'iv-wellness',
    title: 'IV Wellness',
    description: 'Custom nutrient infusions for vitality & glow',
    icon: Droplets,
    component: SerumDroplets
  },
  {
    slug: 'body-contouring',
    title: 'Body Contouring',
    description: 'Non-surgical sculpting & skin tightening',
    icon: Waves,
    component: BodySurface
  }
];

function TreatmentCard({ treatment, index }: { treatment: Treatment; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.2, once: true });
  const [activeCard, setActiveCard] = useState(false);
  const Icon = treatment.icon;

  const navigate = useNavigate();

  const toggleCard = () => {
    setActiveCard((current) => !current);
  };

  const handleLearnMore = () => {
    navigate(`/services/${treatment.slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      whileTap={{ scale: 1.02, y: -6 }}
      onTap={toggleCard}
      onHoverStart={() => setActiveCard(true)}
      onHoverEnd={() => setActiveCard(false)}
      className="group relative"
    >
      <div className={`bg-white rounded-3xl overflow-hidden shadow-lg transition-all duration-500 border ${activeCard
        ? 'shadow-2xl border-[#C6A87D]/45'
        : 'hover:shadow-2xl active:shadow-2xl border-[#C6A87D]/10 active:border-[#C6A87D]/40'
        }`}>
        {/* Image / Animation Area with Rounded Mask */}
        <div className="h-64 bg-gradient-to-br from-[#E8DFD8] to-[#F5E8DC] relative overflow-hidden rounded-t-[24px]">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex items-center justify-center relative overflow-hidden"
          >
            {/* Outer pulsing ring */}
            <div className="mobile-pulse-ring absolute w-36 h-36 rounded-full border-2 border-[#C6A87D]/20" />
            {/* Inner ring */}
            <div className="mobile-pulse-ring absolute w-24 h-24 rounded-full border border-[#C6A87D]/30" style={{ animationDelay: '0.5s' }} />
            {/* Center icon */}
            <div className="mobile-orb-float relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-[#C6A87D]/40 to-[#F5E8DC] flex items-center justify-center shadow-lg">
              <Icon className="w-9 h-9 text-[#C6A87D]" />
            </div>
            {/* Drift particles */}
            <div className="mobile-drift-1 absolute top-4 right-8 w-2 h-2 rounded-full bg-[#C6A87D]/60" />
            <div className="mobile-drift-2 absolute top-10 left-6 w-1.5 h-1.5 rounded-full bg-[#C6A87D]/40" />
            <div className="mobile-drift-3 absolute bottom-8 right-6 w-2 h-2 rounded-full bg-[#C6A87D]/50" />
            <div className="mobile-drift-4 absolute bottom-6 left-8 w-1 h-1 rounded-full bg-[#C6A87D]/60" />
            <div className="mobile-drift-5 absolute top-1/2 right-4 w-1.5 h-1.5 rounded-full bg-[#F5E8DC]/80" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="w-12 h-12 rounded-full bg-[#C6A87D]/10 flex items-center justify-center mb-4 group-hover:bg-[#C6A87D] group-active:bg-[#C6A87D] transition-colors duration-300">
            <Icon className="w-6 h-6 text-[#C6A87D] group-hover:text-white group-active:text-white transition-colors duration-300" />
          </div>
          <h3 className="text-2xl mb-3">{treatment.title}</h3>
          <p className="text-[#6B6661] leading-relaxed">{treatment.description}</p>
          <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLearnMore}
            className="mt-6 text-[#C6A87D] uppercase text-sm tracking-wider flex items-center gap-2 group-hover:gap-3 group-active:gap-3 transition-all"
          >
            Book {treatment.title}
            <span>→</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export function Treatments() {
  return (
    <section className="py-20 md:py-24 px-6 bg-gradient-to-b from-[#F7F4F1] to-[#E8DFD8]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light mb-6">
            <span className="italic">Treatments</span> Tailored to You
          </h2>
          <p className="text-lg text-[#6B6661] max-w-2xl mx-auto">
            Evidence-based aesthetic procedures designed to enhance your natural beauty
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatments.slice(0, 3).map((treatment, index) => (
            <TreatmentCard key={treatment.title} treatment={treatment} index={index} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
          {treatments.slice(3).map((treatment, index) => (
            <TreatmentCard key={treatment.title} treatment={treatment} index={index + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
