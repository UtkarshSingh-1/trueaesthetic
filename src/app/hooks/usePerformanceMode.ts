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
    shouldReduce3D: isMobile || prefersReducedMotion,
  };
}
