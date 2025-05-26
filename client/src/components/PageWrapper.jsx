import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import NavigationArrow from "./NavigationArrows/NavigationArrow"; // ✅ Corrected path and name

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const PageWrapper = ({ children, locationKey }) => {
  const location = useLocation();

  // Paths where navigation arrows should appear
  const arrowPages = ["/categories", "/blog", "/about", "/contact"];

  const showArrows = arrowPages.includes(location.pathname);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={locationKey}
        id="page-wrapper"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="relative min-h-screen overflow-hidden"
      >
        {/* Conditionally render NavigationArrow */}
        {showArrows && <NavigationArrow />}

        {/* Page content */}
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageWrapper;
