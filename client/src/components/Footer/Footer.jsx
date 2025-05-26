const Footer = () => {
  return (
    <footer className="relative bg-black text-gray-400 py-6 text-center overflow-hidden">
      <div className="relative z-20 text-sm md:text-base">
        © {new Date().getFullYear()} CoffeeHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
