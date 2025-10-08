import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import heroEarth from "@/assets/hero-earth.jpg";

export const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.5;

  return (
    <section className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
          backgroundImage: `url(${heroEarth})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/60 rounded-full animate-float" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-secondary/50 rounded-full animate-drift" />
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-accent/40 rounded-full animate-pulse-slow" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-atmosphere bg-clip-text text-transparent animate-scale-in">
          Echoes of Earth
        </h1>
        <p className="text-xl md:text-2xl text-foreground/90 mb-8 animate-slide-up">
          Step into Earth's story—where data becomes emotion.
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 animate-slide-up">
          Experience NASA's Earth observation data transformed into an immersive VR journey
          through our planet's oceans, atmosphere, and interconnected systems.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="w-8 h-8 text-primary" />
      </div>
    </section>
  );
};
