import { useState, useEffect } from 'react';

const defaultBreakpoints = {
  sm: 520,
  md: 720,
  lg: 900,
  xl: 1080,
  xxl: 1600,
};

const getBreakpoint = (width, breakpoints) => {
//   if (width >= breakpoints.xxl) return 'xxl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'sm';
};

const useTailwindBreakpoint = (customBreakpoints = defaultBreakpoints) => {
  const breakpoints = { ...defaultBreakpoints, ...customBreakpoints };
  const [breakpoint, setBreakpoint] = useState(() => getBreakpoint(typeof window !== 'undefined' ? window.innerWidth : 1024, breakpoints));

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth, breakpoints));
    };

    window.addEventListener('resize', handleResize);

    
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoints]);
  
  const isScreenSM = breakpoint === 'sm';
  const isScreenMD = breakpoint === 'md';
  const isScreenLG = breakpoint === 'lg';
  const isScreenXL = breakpoint === 'xl';
  const isScreenXXL = breakpoint === 'xxl';

  return {
    breakpoint,
    isScreenSM,
    isScreenMD,
    isScreenLG,
    isScreenXL,
    isScreenXXL,
  };
};

export default useTailwindBreakpoint;