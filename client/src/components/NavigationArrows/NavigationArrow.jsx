import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// ✅ Correct page order for navigation
const pageOrder = ["/categories", "/blog", "/about", "/contact"];

const NavigationArrows = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentIndex = pageOrder.indexOf(location.pathname);

  const swipeAndNavigate = (direction, path) => {
    const wrapper = document.getElementById("page-wrapper");
    if (!wrapper) return navigate(path);

    const distance = direction === "left" ? "-100%" : "100%";

    const animation = wrapper.animate(
      [
        { transform: "translateX(0%)", opacity: 1 },
        { transform: `translateX(${distance})`, opacity: 0 },
      ],
      {
        duration: 300,
        easing: "ease-in-out",
      }
    );

    animation.onfinish = () => {
      navigate(path);
      wrapper.style.transform = "";
      wrapper.style.opacity = "";
    };
  };

  return (
    <>
      {/* Backward Arrow */}
      {currentIndex > 0 && (
        <motion.button
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.2, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            swipeAndNavigate("right", pageOrder[currentIndex - 1])
          }
          className="
            fixed top-4 left-3 sm:top-6 sm:left-5 md:top-8 md:left-6
            text-yellow-400 
            text-3xl sm:text-4xl md:text-5xl 
            font-bold 
            pointer-events-auto 
            select-none
            p-2 md:p-3
            rounded-full
            bg-transparent
            hover:bg-yellow-100 hover:bg-opacity-20
            transition
            z-50
          "
          aria-label="Go to previous page"
        >
          &lt;
        </motion.button>
      )}

      {/* Forward Arrow */}
      {currentIndex < pageOrder.length - 1 && (
        <motion.button
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.2, x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            swipeAndNavigate("left", pageOrder[currentIndex + 1])
          }
          className="
            fixed top-4 right-3 sm:top-6 sm:right-5 md:top-8 md:right-6
            text-yellow-400 
            text-3xl sm:text-4xl md:text-5xl 
            font-bold 
            pointer-events-auto 
            select-none
            p-2 md:p-3
            rounded-full
            bg-transparent
            hover:bg-yellow-100 hover:bg-opacity-20
            transition
            z-50
          "
          aria-label="Go to next page"
        >
          &gt;
        </motion.button>
      )}
    </>
  );
};

export default NavigationArrows;
