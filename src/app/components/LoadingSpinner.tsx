import { motion } from 'motion/react';

export function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#E8DFD8] to-[#F5E8DC]">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="w-16 h-16 border-4 border-[#C6A87D]/20 border-t-[#C6A87D] rounded-full"
      />
    </div>
  );
}
