import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  /** Once true, stays true — prevents animation re-triggers on scroll-back. Default: true */
  once?: boolean;
}

export function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0.05, rootMargin = '0px', once = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 1. Element already scrolled above the viewport — treat as "seen"
    const rect = el.getBoundingClientRect();
    if (rect.bottom <= 0) {
      setIsInView(true);
      return;
    }

    // 2. Element already (partially) visible on mount — show immediately
    if (rect.top < window.innerHeight) {
      setIsInView(true);
      return;
    }

    // 3. Set up the observer for elements not yet in view
    let disconnected = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once && !disconnected) {
            disconnected = true;
            observer.disconnect();
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    // 4. Failsafe: if observer hasn't fired within 500ms, show content anyway.
    //    Catches edge cases like: peculiar scroll positions, iOS IntersectionObserver
    //    quirks, or concurrent React rendering timing issues.
    const failsafe = window.setTimeout(() => {
      setIsInView((current) => current || true);
    }, 500);

    return () => {
      disconnected = true;
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [threshold, rootMargin, once]);

  return { ref, isInView };
}
