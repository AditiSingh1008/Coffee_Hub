import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const audioRef = useRef(null);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setAudioPlaying(true);
    }
  };

  const handlePauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setAudioPlaying(false);
    }
  };

  return (
    <motion.section
      className="relative text-white w-full h-screen flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 md:px-6 pt-16 md:pt-32 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
      }}
    >
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

      {/* Dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

      {/* Audio */}
      <audio
        ref={audioRef}
        onEnded={() => setAudioPlaying(false)}
        preload="auto"
      >
        <source src="/sounds/welcome-coffeehub.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Left Content */}
      <motion.div
        className="relative z-20 flex flex-col items-start justify-center max-w-full md:max-w-xl space-y-6 px-2 sm:px-4 md:px-4"
        style={{ minHeight: "70vh" }}
      >
             <motion.h1
  className="text-yellow-400 font-extrabold tracking-wide text-center md:text-left text-[7vw] sm:text-4xl md:text-5xl lg:text-6xl whitespace-nowrap hero-text-shadow hero-heading"
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  Welcome to CoffeeHub
</motion.h1>





        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="self-center"
        >
          {!audioPlaying ? (
            <motion.button
              onClick={handlePlayAudio}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              className="motion-button-glow flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500 text-black font-bold shadow-lg hover:bg-yellow-400 transition-all duration-300"
              aria-label="Play Welcome Speech"
            >
              ▶️
            </motion.button>
          ) : (
            <motion.button
              onClick={handlePauseAudio}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              className="motion-button-glow flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400 text-black font-bold shadow-lg transition-all duration-300"
              aria-label="Pause Welcome Speech"
            >
              ⏸️
            </motion.button>
          )}
        </motion.div>

        <motion.div
          className="space-y-4 text-slate-300 ml-0 sm:ml-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          style={{ textShadow: "0 0 6px rgba(0,0,0,0.5)" }}
        >
          {[
            "Experience the warmth of every cup brewed with care.",
            "Discover stories behind every bean and every roast.",
            "Let Brew World be your daily escape and inspiration.",
          ].map((line, i) => (
            <motion.p key={i} className="text-base md:text-lg hero-paragraph">
              {line}
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          className="self-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <Link to="/categories">
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 18px rgba(234,179,8,0.9)",
                backgroundColor: "#facc15",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 sm:px-8 sm:py-4 bg-yellow-500 text-black rounded-full font-semibold shadow-lg hover:bg-yellow-400 transition-all duration-300 hero-button"
            >
              Explore More
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          className="w-1 h-8 bg-yellow-400 rounded-full animate-bounce mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        />
      </motion.div>

      {/* Right Side Coffee Image */}
      <motion.div
        className="floating-coffee-image-container hidden md:flex items-center justify-center pr-4 sm:pr-8"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        style={{ zIndex: 5 }}
      >
        <motion.img
          src="/images/coffee.jpg"
          alt="Coffee Cup"
          className="floating-coffee-image"
          animate={{ y: [20, -20, 20], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.section>
  );
};

export default Hero;
