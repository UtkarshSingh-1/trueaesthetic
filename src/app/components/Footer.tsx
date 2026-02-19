import { motion } from 'motion/react';
import { Instagram, Facebook, Youtube, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  const navLinks = [
    { title: 'Treatments', href: '#treatments' },
    { title: 'Philosophy', href: '#philosophy' },
    { title: 'Team', href: '#team' },
    { title: 'Results', href: '#results' },
    { title: 'FAQ', href: '#faq' },
    { title: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="relative bg-[#2D2A26] text-white overflow-hidden">
      {/* Soft Top Mask Edge */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#F7F4F1] to-transparent" 
           style={{ clipPath: 'ellipse(100% 100% at 50% 0%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="text-3xl font-light mb-4">
              <span className="font-serif italic">True</span>
              <span className="text-[#C6A87D]"> Aesthetic</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Boutique medical aesthetics clinic focused on natural enhancement, 
              safety, and personalized treatments.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C6A87D] flex items-center justify-center transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg mb-6 text-[#C6A87D]">Navigation</h3>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <motion.a
                  key={link.title}
                  href={link.href}
                  whileHover={{ x: 5 }}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {link.title}
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg mb-6 text-[#C6A87D]">Contact</h3>
            <div className="flex flex-col gap-4 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C6A87D] flex-shrink-0 mt-0.5" />
                <span>123 Aesthetic Lane<br />Beverly Hills, CA 90210</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C6A87D] flex-shrink-0" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C6A87D] flex-shrink-0" />
                <span>hello@trueaesthetic.com</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg mb-6 text-[#C6A87D]">Hours</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="text-white">9AM - 6PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="text-white">10AM - 4PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="text-white">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#C6A87D]/30 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; 2026 True Aesthetic. All rights reserved.</p>
          <div className="flex gap-6">
            <motion.a 
              href="#privacy" 
              whileHover={{ color: '#C6A87D' }}
              className="hover:text-[#C6A87D] transition-colors"
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#terms" 
              whileHover={{ color: '#C6A87D' }}
              className="hover:text-[#C6A87D] transition-colors"
            >
              Terms of Service
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
