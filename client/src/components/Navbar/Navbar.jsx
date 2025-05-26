import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const logoVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const linkVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: {
    scale: 1.1,
    color: "#fbbf24",
    transition: { type: "spring", stiffness: 300 },
  },
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Show links only on home page
  const showLinks = location.pathname === "/" || location.pathname === "/home";

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 text-white px-4 bg-black bg-opacity-60 backdrop-blur-sm">
        <div className="relative w-full max-w-6xl mx-auto flex justify-between items-center py-6">
          {/* 3D Styled Logo */}
          <motion.div
            className="text-2xl md:text-3xl font-extrabold tracking-wide"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              rotateY: 10,
              rotateX: 5,
              textShadow: "0px 0px 12px rgba(251, 191, 36, 0.6)",
              transition: { duration: 0.5 },
            }}
            style={{
              perspective: "800px",
              textShadow:
                "2px 2px 0 #000, 4px 4px 0 #fbbf24, 6px 6px 5px rgba(0, 0, 0, 0.5)",
              transformStyle: "preserve-3d",
            }}
          >
            <Link
              to="/"
              className="text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 cursor-pointer select-none"
            >
              CoffeeHub
            </Link>
          </motion.div>

          {/* Hamburger (Mobile) */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Links */}
          {showLinks && (
            <>
              <motion.ul
                className="hidden md:flex space-x-6 lg:space-x-8 uppercase text-sm"
                initial="hidden"
                animate="visible"
              >
                {["Home", "Categories", "Blog", "About", "Contact"].map((name) => (
                  <motion.li
                    key={name}
                    variants={linkVariants}
                    whileHover="hover"
                    className="cursor-pointer"
                  >
                    <Link to={`/${name.toLowerCase()}`} className="block">
                      {name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Mobile Menu */}
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    className="md:hidden absolute bg-black bg-opacity-90 w-full left-0 top-full p-6 space-y-4 text-center uppercase text-sm"
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {["Home", "Categories", "Blog", "About", "Contact"].map((name) => (
                      <Link
                        key={name}
                        to={`/${name.toLowerCase()}`}
                        onClick={() => setMenuOpen(false)}
                        className="block text-white hover:text-yellow-400"
                      >
                        {name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
