import React from "react";
import { motion } from "framer-motion";

interface ScrollToSectionButtonProps {
  children: React.ReactNode;
  sectionId: string;
}

const ScrollToSectionButton: React.FC<ScrollToSectionButtonProps> = ({
  children,
  sectionId,
}) => {
  const scrollToSection = () => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return <motion.button onClick={scrollToSection}>{children}</motion.button>;
};

export default ScrollToSectionButton;
