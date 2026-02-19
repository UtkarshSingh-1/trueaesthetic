import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Award, Heart, Star, Shield } from 'lucide-react';

const pillars = [
  {
    icon: Award,
    title: 'Expert Providers',
    description: 'Board-certified aesthetic specialists with years of clinical excellence',
  },
  {
    icon: Heart,
    title: 'Natural Results',
    description: 'Enhancing your features, never changing who you are',
  },
  {
    icon: Star,
    title: 'Boutique Experience',
    description: 'Personalized attention in a luxurious, private setting',
  },
  {
    icon: Shield,
    title: 'Safety & Science',
    description: 'Evidence-based treatments with the highest safety standards',
  },
];

export function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 px-6 bg-gradient-to-br from-[#E8DFD8] via-[#F7F4F1] to-[#E8DFD8]">
      {/* Diagonal mask transition effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ x: '-100%', y: '-100%' }}
          animate={isInView ? { x: '0%', y: '0%' } : {}}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="w-full h-full bg-gradient-to-br from-transparent via-[#C6A87D]/5 to-transparent"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="serif text-4xl md:text-6xl mb-6 text-[#2C2C2C]" style={{ fontWeight: 300 }}>
            Why Choose
            <br />
            <span style={{ fontWeight: 400 }}>True Aesthetic</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="relative group"
            >
              <div className="h-full p-8 rounded-2xl bg-white/50 backdrop-blur-sm border border-[#C6A87D]/10 hover:border-[#C6A87D]/30 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-[#C6A87D]/20 to-[#C6A87D]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <pillar.icon className="w-8 h-8 text-[#C6A87D]" />
                </div>
                
                <h3 className="text-xl font-medium text-[#2C2C2C] mb-4">
                  {pillar.title}
                </h3>
                
                <p className="text-[#2C2C2C]/70 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
