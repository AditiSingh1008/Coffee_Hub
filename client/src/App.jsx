import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

import { UpdateFollower } from "react-mouse-follower";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Blogs from "./components/Blogs/Blogs";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";
import PageWrapper from "./components/PageWrapper";
import AboutSection from "./components/About/About"; // renamed to avoid conflict
import { useEffect } from "react";

// Home Page Component
const Home = () => (
  <>
    <UpdateFollower
      mouseOptions={{
        backgroundColor: "white",
        zIndex: 999,
        followSpeed: 1.5,
      }}
    >
      <Navbar />
      <Hero />
    </UpdateFollower>
    <Footer />
  </>
);

// Services Page Component (Note route is /categories)
const Categories = () => (
  <>
    <UpdateFollower
      mouseOptions={{
        backgroundColor: "black",
        zIndex: 999,
        followSpeed: 1.5,
      }}
    >
      <Services />
    </UpdateFollower>
  </>
);

// Blog Page Component
const Blog = () => <Blogs />;

// Contact Page Component
const ContactPage = () => <Contact />;

// About Page Component
const AboutPage = () => <AboutSection />;

// Not Found Page Component
const NotFound = () => (
  <div className="text-white text-center p-10">
    <h1>404 - Page Not Found</h1>
  </div>
);

// Main App Component
const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <main className="overflow-x-hidden bg-black min-h-screen">
      <PageWrapper locationKey={location.pathname}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          {/* Note: Services is mapped to /categories */}
          <Route path="/categories" element={<Categories />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageWrapper>
    </main>
  );
};

export default App;
