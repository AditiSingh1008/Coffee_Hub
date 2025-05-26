import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavigationArrow from "../NavigationArrows/NavigationArrow";


const envelopeVariants = {
  closed: { rotateX: 0 },
  open: { rotateX: -180, transition: { duration: 1, ease: "easeInOut" } },
};

const formVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { delay: 1, duration: 0.8, ease: "easeOut" } },
  flyAway: { y: -300, opacity: 0, transition: { duration: 1, ease: "easeInOut" } },
};

const cardVariants = {
  front: { rotateY: 0, transition: { duration: 0.6 } },
  back: { rotateY: 180, transition: { duration: 0.6 } },
};

import PropTypes from "prop-types";

const EnvelopeSVG = ({ flapOpen }) => (
  <motion.svg
    width="220"
    height="140"
    viewBox="0 0 220 140"
    xmlns="http://www.w3.org/2000/svg"
    style={{ cursor: "default" }}
  >
    <rect width="220" height="140" fill="#222" rx="15" ry="15" stroke="#FFC107" strokeWidth="3" />
    <motion.polygon
      points="0,0 110,70 220,0"
      fill="#FFC107"
      variants={envelopeVariants}
      initial="closed"
      animate={flapOpen ? "open" : "closed"}
      style={{ transformOrigin: "center bottom" }}
    />
  </motion.svg>
);

EnvelopeSVG.propTypes = {
  flapOpen: PropTypes.bool.isRequired,
};

const FlipCard = ({ label, value, placeholder, type = "text", onChange }) => {
  const [flipped, setFlipped] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleBlur = () => {
    setFlipped(false);
    onChange(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };

  return (
    <div
      style={{ perspective: 600 }}
      className="w-full max-w-md mb-6 cursor-pointer select-none mx-auto"
      onClick={() => !flipped && setFlipped(true)}
    >
      <motion.div
        variants={cardVariants}
        animate={flipped ? "back" : "front"}
        initial="front"
        style={{
          position: "relative",
          width: "100%",
          minHeight: "70px",
          transformStyle: "preserve-3d",
          cursor: flipped ? "auto" : "pointer",
        }}
      >
        {/* Front */}
        <div
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            width: "100%",
            height: "100%",
            padding: "1rem",
            borderRadius: "0.5rem",
            backgroundColor: "#121212",
            border: "2px solid #FFC107",
            color: "white",
            fontSize: "1.1rem",
            whiteSpace: "normal",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            overflowY: "auto",
            display: "block",
          }}
        >
          <strong style={{ whiteSpace: "nowrap" }}>{label}:&nbsp;</strong>
          {value ? (
            <span>{value}</span>
          ) : (
            <span style={{ opacity: 0.5, fontStyle: "italic" }}>{placeholder}</span>
          )}
        </div>

        {/* Back */}
        <div
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            width: "100%",
            height: "100%",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            backgroundColor: "#222",
            border: "2px solid #FFC107",
            color: "white",
            transform: "rotateY(180deg)",
            display: "flex",
            alignItems: "center",
          }}
        >
            {type === "textarea" ? (
              <textarea
                autoFocus
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                rows={3}
                className="w-full bg-transparent text-white placeholder-white placeholder-opacity-50 outline-none resize-y p-2 rounded min-h-[80px] max-h-60 overflow-auto"
                placeholder={placeholder}
              />
            ) : (
              <input
                autoFocus
                type={type}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-white placeholder-white placeholder-opacity-50 outline-none p-2 rounded"
                placeholder={placeholder}
              />
            )}
        </div>
      </motion.div>
    </div>
  );
};

FlipCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

const Contact = () => {
  const [flapOpen, setFlapOpen] = useState(false);
  const [formVisible, setFormVisible] = useState(true);
  const [formFlying, setFormFlying] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFlapOpen(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        setName("");
        setEmail("");
        setMessage("");
        setFormFlying(true);

        setTimeout(() => {
          setFormFlying(false);
          setFormVisible(false);
          setFlapOpen(false);

          setTimeout(() => {
            setFormVisible(true);
            setFlapOpen(true);
            setStatus(null);
          }, 1200);
        }, 1000);
      } else {
        setStatus({ type: "error", message: "Failed to send message. Please try again." });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus({ type: "error", message: "Failed to send message. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex flex-col justify-center items-center p-6 text-white min-h-screen overflow-hidden">
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

       {/* Navigation Arrows - added here */}
                  <NavigationArrow />

      {/* Envelope */}
      <motion.div className="relative z-20 mb-6" style={{ perspective: 600 }}>
        <EnvelopeSVG flapOpen={flapOpen} />
      </motion.div>

      <AnimatePresence mode="wait">
        {formVisible && (
          <motion.div
            key="form"
            variants={formVariants}
            initial="hidden"
            animate={formFlying ? "flyAway" : "visible"}
            exit="hidden"
            className="relative z-20 max-w-md w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-black bg-opacity-70 p-6 sm:p-8 rounded-lg shadow-lg mx-4 sm:mx-auto"
          >
            <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <FlipCard label="Name" value={name} placeholder="Your name" onChange={setName} />
              <FlipCard label="Email" type="email" value={email} placeholder="Your email" onChange={setEmail} />
              <FlipCard
                label="Message"
                // type="textarea"
                value={message}
                placeholder="Your message"
                onChange={setMessage}
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded transition flex justify-center items-center gap-2 ${
                  loading ? "cursor-not-allowed opacity-70" : ""
                }`}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                ) : (
                  "Send"
                )}
              </button>
            </form>

            <AnimatePresence>
              {status && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-4 text-center ${
                    status.type === "success" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {status.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
