import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

import NavigationArrow from "../NavigationArrows/NavigationArrow";
import { createCheckoutSession } from "../../api";




import cappuccinoImage from "../../assets/cappuccino.jpg";
import blackCoffeeImage from "../../assets/black-coffee.jpg";
import americanoImage from "../../assets/americano-coffe.webp";
import mochaImage from "../../assets/mocha-coffee-image.webp";
import latteImage from "../../assets/latte-image.jpg";

const coffeeDrinks = [
  {
    name: "Cappuccino",
    description: "A classic Italian coffee drink with espresso, steamed milk, and foam.",
    image: cappuccinoImage,
    price: "$4.50",
    stripeLink: "https://buy.stripe.com/test_cappuccino",
  },
  {
    name: "Espresso",
    description: "Strong and bold coffee made by forcing hot water through finely ground beans.",
    image: americanoImage,
    price: "$3.00",
    stripeLink: "https://buy.stripe.com/test_espresso",
  },
  {
    name: "Black_Coffee",
    description: "Simple brewed coffee without any additives, pure and strong.",
    image: blackCoffeeImage,
    price: "$2.50",
    stripeLink: "https://buy.stripe.com/test_blackcoffee",
  },
  {
    name: "Americano",
    description: "Espresso diluted with hot water for a lighter coffee flavor.",
    image: americanoImage,
    price: "$3.50",
    stripeLink: "https://buy.stripe.com/test_americano",
  },
  {
    name: "Mocha",
    description: "A chocolate-flavored coffee drink made with espresso, steamed milk, and chocolate syrup.",
    image: mochaImage,
    price: "$5.00",
    stripeLink: "https://buy.stripe.com/test_mocha",
  },
  {
    name: "Latte",
    description: "Espresso with steamed milk and a light layer of foam.",
    image: latteImage,
    price: "$4.75",
    stripeLink: "https://buy.stripe.com/test_latte",
  },
];

const wheelOffers = [
  "Buy 1 Get 1 Free",
  "20% Off Any Drink",
  "Free Mocha Upgrade",
  "Free Small Black Coffee",
  "15% Off Your Next Visit",
  "Free Espresso Shot",
  "Free Latte Art Class",
  "No Offer - Try Again!",
];

const segmentAngle = 360 / wheelOffers.length;

const Services = () => {
  const [spinDegrees, setSpinDegrees] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonOffer, setWonOffer] = useState(null);
  const controls = useAnimation();

  const spinWheel = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWonOffer(null);

    const randomIndex = Math.floor(Math.random() * wheelOffers.length);
    const rotation = 1800 + (360 - randomIndex * segmentAngle - segmentAngle / 2);

    await controls.start({
      rotate: rotation,
      transition: { duration: 4, ease: "easeOut" },
    });

    const normalizedRotation = rotation % 360;
    setSpinDegrees(normalizedRotation);
    setWonOffer(wheelOffers[randomIndex]);
    setIsSpinning(false);
  };

  const handleCheckout = async (product) => {
  console.log("Sending product to backend:", product);
  try {
    const data = await createCheckoutSession(product);

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Checkout session failed to create.");
      console.error("No checkout URL returned:", data);
    }
  } catch (error) {
    console.error("Checkout error:", error);
    alert("Something went wrong with checkout.");
  }
};


  return (
    <motion.section
      className="relative text-white p-6 bg-black overflow-hidden"
      style={{ minHeight: "100vh" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
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

      {/* Navigation Arrows - added here */}
      <NavigationArrow />

      {/* Main Content */}
      <div className="relative z-10">
        <h2 className="text-4xl font-bold mb-8 text-center text-yellow-400">
          Popular Coffee Drink
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {coffeeDrinks.map(({ name, description, image, price }, index) => (
            <motion.div
              key={name}
              className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col items-center max-w-sm mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.img
                src={image}
                alt={name}
                className="w-full h-60 object-cover rounded-t-2xl"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <div className="p-5 flex flex-col justify-between flex-grow w-full">
                <motion.h3 className="text-2xl font-bold text-yellow-400 mb-3 text-center">
                  {name}
                </motion.h3>
                <p className="text-center text-base mb-5 text-gray-200 leading-relaxed">
                  {description}
                </p>
                <div className="flex flex-col items-center mt-auto">
                  <div className="text-xl font-extrabold mb-3 text-white">{price}</div>

                  <button
                    onClick={() => handleCheckout(name)}
                    className="bg-yellow-400 text-black px-6 py-2 text-base font-semibold rounded-full hover:bg-yellow-300 transition-all duration-200 shadow-md"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Spin-the-Wheel Section */}
        <div className="mt-24 max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-extrabold mb-8 tracking-wide text-yellow-400">
            🎉 Try Your Luck! Spin the Wheel for Special Offers 🎉
          </h3>

          <motion.div
            className="relative mx-auto"
            style={{ width: 320, height: 320 }}
            onClick={spinWheel}
            animate={controls}
            initial={{ rotate: spinDegrees }}
            whileHover={{ scale: 1.05, cursor: "pointer" }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              viewBox="0 0 320 320"
              className="rounded-full border-8 border-yellow-400 shadow-lg bg-gray-900"
            >
              <g transform="translate(160 160)">
                {wheelOffers.map((offer, i) => {
                  const startAngle = i * segmentAngle;
                  const endAngle = startAngle + segmentAngle;
                  const largeArcFlag = segmentAngle > 180 ? 1 : 0;
                  const radius = 150;
                  const x1 = radius * Math.cos((Math.PI * startAngle) / 180);
                  const y1 = radius * Math.sin((Math.PI * startAngle) / 180);
                  const x2 = radius * Math.cos((Math.PI * endAngle) / 180);
                  const y2 = radius * Math.sin((Math.PI * endAngle) / 180);

                  return (
                    <g key={i}>
                      <path
                        d={`M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                        fill={i % 2 === 0 ? "#b45309" : "#f59e0b"}
                        stroke="#000"
                        strokeWidth="1"
                      />
                      <text
                        x={((x1 + x2) / 2) * 0.6}
                        y={((y1 + y2) / 2) * 0.6}
                        fill="#000"
                        fontSize="12"
                        fontWeight="bold"
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        transform={`rotate(${startAngle + segmentAngle / 2})`}
                        pointerEvents="none"
                      >
                        {offer}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
            <div
              style={{
                position: "absolute",
                top: -20,
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "15px solid transparent",
                borderRight: "15px solid transparent",
                borderBottom: "25px solid #facc15",
                filter: "drop-shadow(0 0 3px #facc15)",
              }}
            />
          </motion.div>

          <AnimatePresence>
            {wonOffer && (
              <motion.div
                key="offer"
                className="mt-6 text-yellow-400 font-extrabold text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
              >
                You won: {wonOffer}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className="mt-10 px-6 py-3 bg-yellow-400 text-black rounded-full font-semibold shadow-lg hover:bg-yellow-300 transition-all duration-200"
          >
            {isSpinning ? "Spinning..." : "Spin the Wheel"}
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default Services;
