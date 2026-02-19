import { useEffect, useState } from 'react';

export function usePerformanceMode() {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      setIsMobile(mobileQuery.matches);
      setPrefersReducedMotion(motionQuery.matches);
    };

    update();
    mobileQuery.addEventListener('change', update);
    motionQuery.addEventListener('change', update);

    return () => {
      mobileQuery.removeEventListener('change', update);
      motionQuery.removeEventListener('change', update);
    };
  }, []);

  return {
    isMobile,
    prefersReducedMotion,
    // Disable 3D only when reduced motion is requested.
    shouldReduce3D: prefersReducedMotion,
    // Keep a separate signal for simplified settings on mobile.
    shouldSimplify3D: isMobile || prefersReducedMotion,
  };
}
