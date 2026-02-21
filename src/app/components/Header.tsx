import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { scrollToSection } from '../utils/scroll';
import { useNavigate } from 'react-router';

export function Header() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Treatments', id: 'treatments' },
    { label: 'Philosophy', id: 'philosophy' },
    { label: 'Team', id: 'team' },
    { label: 'Results', id: 'results' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/80 backdrop-blur-md shadow-lg'
        : 'bg-white/90 backdrop-blur-md md:bg-transparent md:backdrop-blur-none'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection('root')}
            className="text-xl sm:text-2xl font-light tracking-tight"
            aria-label="Go to top"
          >
            <span className="font-serif italic text-[#2D2A26]">True</span>
            <span className="text-[#C6A87D]"> Aesthetic</span>
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                whileHover={{ y: -2 }}
                className="text-sm uppercase tracking-wider text-[#2D2A26] hover:text-[#C6A87D] active:text-[#C6A87D] transition-colors duration-300"
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/book')}
              className="px-6 py-3 bg-[#2D2A26] text-[#F7F4F1] rounded-full uppercase tracking-wider text-xs hover:bg-[#C6A87D] active:bg-[#C6A87D] transition-colors duration-300"
            >
              Book Now
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-[#2D2A26] active:scale-95 transition-transform"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-[#C6A87D]/20"
          >
            <nav className="px-6 py-8 flex flex-col gap-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleNavClick(item.id)}
                  whileTap={{ scale: 0.98 }}
                  className="text-lg text-[#2D2A26] hover:text-[#C6A87D] active:text-[#C6A87D] transition-colors text-left"
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleNavClick('contact')}
                className="px-6 py-4 bg-[#2D2A26] text-[#F7F4F1] rounded-full uppercase tracking-wider text-sm hover:bg-[#C6A87D] active:bg-[#C6A87D] transition-colors"
              >
                Book Now
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
