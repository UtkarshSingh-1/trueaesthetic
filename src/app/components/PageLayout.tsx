import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { scrollToSection } from '../utils/scroll';

interface PageLayoutProps {
    children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
        setTimeout(() => scrollToSection('root'), 100);
    };

    return (
        <div className="min-h-screen bg-[#F7F4F1] text-[#2D2A26]">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLogoClick}
                        className="text-xl sm:text-2xl font-light tracking-tight"
                    >
                        <span className="font-serif italic text-[#2D2A26]">True</span>
                        <span className="text-[#C6A87D]"> Aesthetic</span>
                    </motion.button>

                    <motion.button
                        whileHover={{ x: -3 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm text-[#6B6661] hover:text-[#C6A87D] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </motion.button>
                </div>
            </header>

            {/* Page Content */}
            <div className="pt-20">{children}</div>
        </div>
    );
}
