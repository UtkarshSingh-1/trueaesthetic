import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const teamMembers = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Medical Director',
    specialty: 'Aesthetic Medicine',
  },
  {
    name: 'Dr. James Chen',
    role: 'Aesthetic Physician',
    specialty: 'Injectables & Laser',
  },
  {
    name: 'Dr. Emma Rodriguez',
    role: 'Aesthetic Specialist',
    specialty: 'Skin Rejuvenation',
  },
];

export function Team() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-32 px-6 bg-[#F7F4F1] relative overflow-hidden">
      {/* Subtle contour lines background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contour" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10,50 Q30,30 50,50 T90,50" fill="none" stroke="#C6A87D" strokeWidth="1"/>
              <path d="M10,60 Q30,40 50,60 T90,60" fill="none" stroke="#C6A87D" strokeWidth="1"/>
              <path d="M10,70 Q30,50 50,70 T90,70" fill="none" stroke="#C6A87D" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contour)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h2 className="serif text-4xl md:text-6xl mb-6 text-[#2C2C2C]" style={{ fontWeight: 300 }}>
            Meet Our
            <br />
            <span style={{ fontWeight: 400 }}>Expert Team</span>
          </h2>
          <p className="text-lg text-[#2C2C2C]/70 max-w-3xl mx-auto leading-relaxed">
            Board-certified aesthetic specialists combining clinical precision with artistic vision to create balanced, authentic outcomes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 mt-20">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative"
            >
              {/* Portrait with facial contour mask */}
              <div className="relative mb-6 overflow-hidden">
                <motion.div
                  animate={{
                    clipPath: hoveredIndex === i
                      ? 'ellipse(50% 55% at 50% 45%)'
                      : 'ellipse(45% 50% at 50% 45%)',
                  }}
                  transition={{ duration: 0.5 }}
                  className="aspect-[3/4] bg-gradient-to-br from-[#E8DFD8] to-[#CFC6BE] rounded-3xl overflow-hidden"
                >
                  <ImageWithFallback
                    src={`https://images.unsplash.com/photo-${i === 0 ? '1594824476967-48c8b964273f' : i === 1 ? '1612349317150-e413f6a5b16d' : '1559839734-2b71ea197ec2'}?w=600&h=800&fit=crop`}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="text-2xl serif text-[#2C2C2C] mb-2" style={{ fontWeight: 400 }}>
                  {member.name}
                </h3>
                <p className="text-[#C6A87D] font-medium mb-1">{member.role}</p>
                <p className="text-[#2C2C2C]/60 text-sm">{member.specialty}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
