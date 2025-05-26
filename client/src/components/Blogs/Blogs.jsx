import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import NavigationArrow from "../NavigationArrows/NavigationArrow";


const testimonials = [
  { name: "Sophia L.", text: "The cappuccino is divine. Creamy and perfectly balanced!", rating: 5 },
  { name: "James T.", text: "Black coffee is bold and authentic. Just how I like it!", rating: 4 },
  { name: "Ayesha K.", text: "Mocha here is heavenly. Chocolate and coffee bliss!", rating: 5 },
  { name: "Liam W.", text: "Espresso is strong and flavorful—gets me going!", rating: 4 },
  { name: "Emily R.", text: "Latte art is stunning and the drink tastes even better!", rating: 5 },
  { name: "Arjun D.", text: "Perfect spot for coffee lovers. Highly recommend!", rating: 5 },
  { name: "Mei H.", text: "Smoothest latte I’ve ever had, and the atmosphere is cozy!", rating: 4 },
  { name: "Carlos F.", text: "Rich aromas, friendly staff, and amazing drinks!", rating: 5 },
];

const Star = ({ filled }) => (
  <svg
    className={`w-5 h-5 ${filled ? "text-amber-400" : "text-gray-600"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.973a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.384 2.455a1 1 0 00-.364 1.118l1.287 3.973c.3.922-.755 1.688-1.54 1.118L10 13.347l-3.384 2.455c-.785.57-1.84-.196-1.54-1.118l1.287-3.973a1 1 0 00-.364-1.118L3.615 9.4c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.973z" />
  </svg>
);

const testimonialVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(5px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.3,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

const Blog = () => {
  return (
    <section className="relative min-h-screen text-white overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/latte-art.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>

      {/* Navigation Arrow - corrected usage */}
      <NavigationArrow />

      {/* Content */}
      <div className="relative z-20 px-6 py-20 max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-amber-400 mb-14 tracking-tight"
          initial={{ opacity: 0, y: -80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          What Our Customers Say
        </motion.h2>

        <div className="space-y-12 max-w-3xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              custom={i}
              variants={testimonialVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-amber-300/20 flex flex-col items-center"
            >
              {/* Profile Pic + Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-14 h-14">
                  <img
                    src="/icons/circle-user-solid.svg"
                    alt={t.name}
                    className="w-full h-full rounded-full object-cover border-2 border-amber-400"
                    loading="lazy"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-amber-400 p-1 rounded-full shadow-md">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} filled={star <= t.rating} />
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <motion.p
                className="text-lg md:text-xl italic text-amber-100 leading-relaxed text-center mb-2"
                whileHover={{ scale: 1.03, color: "#FFEBCD" }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                “{t.text}”
              </motion.p>

              {/* Name */}
              <motion.p
                className="font-semibold text-sm uppercase text-amber-400 tracking-wider"
                animate={{
                  textShadow: [
                    "0px 0px 0px #fff",
                    "0px 0px 4px #fff",
                    "0px 0px 8px #ffcc80",
                    "0px 0px 0px #fff",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                — {t.name}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
