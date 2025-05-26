import { motion } from "framer-motion";

const BannerText = () => {
  return (
    <motion.section
      className="text-white p-6 bg-black min-h-24 my-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Banner text content removed as requested */}
    </motion.section>
  );
};

export default BannerText;
