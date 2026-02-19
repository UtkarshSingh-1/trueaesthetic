import { motion } from 'motion/react';
import { useInView } from '../hooks/useInView';
import { Award, Heart, Gem, Shield } from 'lucide-react';
import { useState } from 'react';

const reasons = [
  {
    icon: Award,
    title: 'Expert Providers',
    description: 'Board-certified aesthetic specialists with years of advanced training'
  },
  {
    icon: Heart,
    title: 'Natural Results',
    description: 'Subtle enhancements that honor your unique features and beauty'
  },
  {
    icon: Gem,
    title: 'Boutique Experience',
    description: 'Personalized care in a luxurious, private setting'
  },
  {
    icon: Shield,
    title: 'Safety & Science',
    description: 'Evidence-based treatments with the highest medical standards'
  }
];

export function WhyChooseUs() {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const activateCard = (index: number) => {
    setActiveCard(index);
    window.setTimeout(() => {
      setActiveCard((current) => (current === index ? null : current));
    }, 420);
  };

  return (
    <section ref={ref} className="relative py-32 px-6 bg-gradient-to-br from-[#E8DFD8] to-[#F7F4F1] overflow-hidden">
      {/* Diagonal Mask Transition */}
      <motion.div
        initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
        animate={isInView ? { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' } : {}}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-gradient-to-br from-[#F5E8DC] to-[#E8DFD8] opacity-50"
      />

      {/* Subtle geometric background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C6A87D" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light mb-6">
            Why Choose<br />
            <span className="italic">True Aesthetic</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C6A87D] to-transparent mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -10 }}
                whileTap={{ scale: 1.02, y: -6 }}
                onTapStart={() => activateCard(index)}
                onClick={() => activateCard(index)}
                className="group relative"
              >
                <div
                  className={`bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg transition-all duration-500 border h-full ${
                    activeCard === index
                      ? 'shadow-2xl border-[#C6A87D]/55'
                      : 'hover:shadow-2xl active:shadow-2xl border-[#C6A87D]/20 active:border-[#C6A87D]/50'
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C6A87D] to-[#F5E8DC] flex items-center justify-center mb-6"
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl mb-4">{reason.title}</h3>
                  <p className="text-[#6B6661] leading-relaxed">{reason.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
