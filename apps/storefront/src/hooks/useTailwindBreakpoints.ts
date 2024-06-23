import { useState, useEffect } from 'react';

const defaultBreakpoints = {
  sm: 520,
  md: 720,
  lg: 900,
  xl: 1080,
  xxl: 1600,
};

type Breakpoints = typeof defaultBreakpoints;
type BreakpointKey = keyof Breakpoints;

const getBreakpoint = (width: number, breakpoints: Breakpoints): BreakpointKey => {
  if (width >= breakpoints.xxl) return 'xxl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'sm';
};

const useTailwindBreakpoint = (customBreakpoints: Partial<Breakpoints> = {}): {
  breakpoint: BreakpointKey;
  isScreenSM: boolean;
  isScreenMD: boolean;
  isScreenLG: boolean;
  isScreenXL: boolean;
  isScreenXXL: boolean;
} => {
  const breakpoints = { ...defaultBreakpoints, ...customBreakpoints };
  const [breakpoint, setBreakpoint] = useState<BreakpointKey>(() =>
    getBreakpoint(typeof window !== 'undefined' ? window.innerWidth : 1024, breakpoints)
  );

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth, breakpoints));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoints]);

  return {
    breakpoint,
    isScreenSM: breakpoint === 'sm',
    isScreenMD: breakpoint === 'md',
    isScreenLG: breakpoint === 'lg',
    isScreenXL: breakpoint === 'xl',
    isScreenXXL: breakpoint === 'xxl',
  };
};

export default useTailwindBreakpoint;
