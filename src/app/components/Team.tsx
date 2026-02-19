import { motion } from 'motion/react';
import { useInView } from '../hooks/useInView';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

const teamMembers = [
  {
    name: 'Dr. Sarah Chen',
    title: 'Medical Director',
    specialty: 'Board-Certified Dermatologist',
    image: 'https://images.unsplash.com/photo-1659353888906-adb3e0041693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmZW1hbGUlMjBkb2N0b3IlMjBtZWRpY2FsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxMzg2NTgzfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    name: 'Dr. Michael Roberts',
    title: 'Aesthetic Physician',
    specialty: 'Facial Aesthetics Specialist',
    image: 'https://images.unsplash.com/photo-1615177393114-bd2917a4f74a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwZG9jdG9yJTIwbWVkaWNhbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTM4NjU4M3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    name: 'Emma Williams',
    title: 'Lead Aesthetician',
    specialty: 'Clinical Skincare Expert',
    image: 'https://images.unsplash.com/photo-1656568726647-9092bf2b5640?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmZW1hbGUlMjBhZXN0aGV0aWNpYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzEzODY1ODN8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export function Team() {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setActiveCard((current) => (current === index ? null : index));
  };

  return (
    <section ref={ref} className="py-32 px-6 bg-[#F7F4F1] relative overflow-hidden">
      {/* Faint contour lines background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contours" width="100" height="100" patternUnits="userSpaceOnUse">
              <ellipse cx="50" cy="50" rx="30" ry="40" fill="none" stroke="#C6A87D" strokeWidth="1"/>
              <ellipse cx="50" cy="50" rx="40" ry="50" fill="none" stroke="#C6A87D" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contours)" />
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
            Meet Our<br />
            <span className="italic">Expert Team</span>
          </h2>
          <p className="text-lg text-[#6B6661] max-w-3xl mx-auto leading-relaxed">
            Board-certified aesthetic specialists combining clinical precision with artistic vision 
            to create balanced, authentic outcomes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.99 }}
              onTap={() => toggleCard(index)}
              onHoverStart={() => setActiveCard(index)}
              onHoverEnd={() => setActiveCard((current) => (current === index ? null : current))}
              className="group relative"
            >
              {/* Portrait with Facial Contour Mask */}
              <motion.div
                initial={{ clipPath: 'ellipse(0% 0% at 50% 40%)' }}
                animate={isInView ? { clipPath: 'ellipse(50% 60% at 50% 40%)' } : {}}
                transition={{ duration: 1, delay: 0.4 + index * 0.15 }}
                whileHover={{ clipPath: 'ellipse(55% 65% at 50% 40%)' }}
                whileTap={{ scale: 1.01 }}
                className={`relative aspect-[3/4] rounded-[40%] overflow-hidden mb-6 transition-all duration-300 ${
                  activeCard === index
                    ? 'ring-2 ring-[#C6A87D]/60 shadow-2xl'
                    : 'bg-gradient-to-br from-[#E8DFD8] to-[#CFC6BE]'
                }`}
              >
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>

              {/* Info */}
              <div className="text-center">
                <h3 className="text-2xl mb-2">{member.name}</h3>
                <p className="text-[#C6A87D] mb-1">{member.title}</p>
                <p className="text-sm text-[#6B6661]">{member.specialty}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
