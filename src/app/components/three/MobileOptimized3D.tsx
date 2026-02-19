import { ReactNode, useEffect, useState } from 'react';

interface MobileOptimized3DProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function MobileOptimized3D({ children, fallback }: MobileOptimized3DProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [shouldRender3D, setShouldRender3D] = useState(true);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Also check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setShouldRender3D(!prefersReducedMotion);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // On mobile with reduced performance, show fallback
  if (isMobile && !shouldRender3D && fallback) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
