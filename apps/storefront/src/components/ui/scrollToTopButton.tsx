import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const ScrollToTopButton = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      // Trigger the animation based on scroll position, if needed
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  const scrollToTop = () => {
    controls.start({
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button onClick={scrollToTop} animate={controls}>
      {children}
    </motion.button>
  );
};

export default ScrollToTopButton;
