import { useState, useEffect } from "react";

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/astronaut-logo.png"
            alt="Echoes of Earth Logo"
            className="w-12 h-12 rounded-full"
          />
          <span className="text-xl font-bold bg-gradient-atmosphere bg-clip-text text-transparent">
            Echoes of Earth
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="#vr"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            VR Experience
          </a>
          <a
            href="#data"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Data
          </a>
          <a
            href="#stories"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Stories
          </a>
          <a
            href="#accessibility"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Accessibility
          </a>
        </div>
      </div>
    </nav>
  );
};
