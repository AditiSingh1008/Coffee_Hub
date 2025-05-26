import { motion } from "framer-motion";

const Banner = () => {
  return (
    <motion.section
      className="text-white p-6 bg-black min-h-48 rounded-lg my-8"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Banner content removed as requested */}
    </motion.section>
  );
};

export default Banner;
