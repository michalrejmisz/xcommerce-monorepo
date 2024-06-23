'use client';

import { useEffect, useRef } from 'react';
import { useActiveSection } from '~/contexts/ActiveSectionContext';

export const useIntersectionObserver = (sectionName: string) => {
  const { setActiveSection } = useActiveSection();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActiveSection(sectionName);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [sectionName, setActiveSection]);

  return ref;
};