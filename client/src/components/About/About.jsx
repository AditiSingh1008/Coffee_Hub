import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavigationArrow from "../NavigationArrows/NavigationArrow";


import aboutImage1 from "../../assets/coffeeaboutpageimage.webp";
import aboutImage2 from "../../assets/coffeeaboutpageimage4.webp";
import aboutImage3 from "../../assets/coffeeaboutpageimage3.jpg";
import aboutImage4 from "../../assets/coffeeaboutpageimage2.webp";
import aboutImage5 from "../../assets/americano-coffe.webp";
import aboutImage6 from "../../assets/mocha-coffee-image.webp";

const PAGE_TURN_SOUND = "/sounds/page-flip.mp3";

const pages = [
  {
    text: `Welcome to CoffeeHub — where each cup tells a story. Our passion for coffee starts from the farm to your table. 
We carefully select the finest beans from sustainable farms worldwide, ensuring every sip bursts with rich flavor and aroma.`,
    image: aboutImage1,
  },
  {
    text: `At CoffeeHub, roasting is an art form. Our expert roasters craft every batch to highlight the unique notes and profiles of each origin. 
From bright citrus hints to deep chocolate undertones, every blend is designed to delight your palate.`,
    image: aboutImage2,
  },
  {
    text: `Step into our cafés, and you’re welcomed by a cozy ambiance made for connection and creativity. 
Whether you’re working, meeting friends, or just relaxing, our space is designed with you in mind.`,
    image: aboutImage3,
  },
  {
    text: `Our baristas are artisans who pour their heart into every cup. From classic espresso shots to beautiful latte art, 
they ensure your coffee experience is nothing short of perfect every time.`,
    image: aboutImage4,
  },
  {
    text: `More than just coffee, CoffeeHub is a community. We host workshops, tastings, and events that bring coffee lovers together. 
Join us to learn, share, and celebrate the culture of coffee.`,
    image: aboutImage5,
  },
  {
    text: `Thank you for being part of our journey. We invite you to explore our diverse menu, discover new favorites, 
and savor moments crafted with care. CoffeeHub — your destination for exceptional coffee and warm connections.`,
    image: aboutImage6,
  },
];

const pageVariants = {
  enterLeft: { rotateY: -100, x: "-100%", opacity: 0 },
  enterRight: { rotateY: 100, x: "100%", opacity: 0 },
  center: { rotateY: 0, x: "0%", opacity: 1 },
  exitLeft: { rotateY: 100, x: "100%", opacity: 0, transition: { duration: 0.8 } },
  exitRight: { rotateY: -100, x: "-100%", opacity: 0, transition: { duration: 0.8 } },
};

const About = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [typedText, setTypedText] = useState("");
  const audioRef = useRef(null);
  const autoPlayRef = useRef();

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const changePage = (newIndex, dir) => {
    let index = newIndex;
    if (index < 0) index = pages.length - 1;
    else if (index >= pages.length) index = 0;
    setDirection(dir);
    setPageIndex(index);
    setTypedText("");
    playSound();
  };

  useEffect(() => {
    const fullText = pages[pageIndex].text;
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex++;
      setTypedText(fullText.slice(0, currentIndex));

      if (currentIndex === fullText.length) clearInterval(interval);
    }, 15);

    return () => clearInterval(interval);
  }, [pageIndex]);

  useEffect(() => {
    autoPlayRef.current = () => {
      changePage(pageIndex + 1, 1);
    };
  }, [pageIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      autoPlayRef.current();
    }, 8000);
    return () => clearInterval(interval);
  }, [pageIndex]);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden select-none">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/videos/latte-art.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

      {/* Navigation Arrows - added here */}
                  <NavigationArrow />

      {/* Page title */}
      <h1 className="pt-10 md:pt-16 text-center text-3xl md:text-5xl font-bold text-amber-400 z-20 pointer-events-none select-none relative">
        About CoffeeHub
      </h1>

      <audio ref={audioRef} src={PAGE_TURN_SOUND} preload="auto" />

      {/* Content container */}
      <div className="mt-24 md:mt-32 flex items-center justify-center px-4 sm:px-6 md:px-12 relative z-20">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={pageIndex}
            custom={direction}
            variants={pageVariants}
            initial={direction === 1 ? "enterRight" : "enterLeft"}
            animate="center"
            exit={direction === 1 ? "exitLeft" : "exitRight"}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="w-full max-w-6xl"
            style={{ perspective: 2000, transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
          >
            <div
              className="bg-white/20 backdrop-blur-md rounded-xl border border-amber-300 w-full flex flex-col md:flex-row shadow-lg overflow-hidden"
              style={{ boxShadow: "0 0 40px rgba(255, 191, 36, 0.6)" }}
            >
              {/* Text section */}
              <div className="md:w-1/2 w-full p-5 sm:p-6 md:p-10 flex items-center justify-center">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-amber-100 leading-relaxed text-center md:text-left whitespace-pre-line">
                  {typedText}
                </p>
              </div>

              {/* Image section */}
              <div className="md:w-1/2 w-full h-60 sm:h-80 md:h-auto">
                <img
                  src={pages[pageIndex].image}
                  alt={`About CoffeeHub page ${pageIndex + 1}`}
                  className="object-cover w-full h-full"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default About;
