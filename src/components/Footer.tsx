import { Github, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="relative py-12 px-4 border-t border-foreground/10 overflow-hidden">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary/40 rounded-full animate-float" />
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-secondary/30 rounded-full animate-drift" />
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-accent/30 rounded-full animate-pulse-slow" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-3 bg-gradient-atmosphere bg-clip-text text-transparent">
              Echoes of Earth
            </h3>
            <p className="text-sm text-muted-foreground">
              Transforming NASA's Earth data into immersive VR experiences
              that connect humanity to our planet.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-3 text-foreground/90">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#vr" className="hover:text-primary transition-colors">
                  VR Experience
                </a>
              </li>
              <li>
                <a href="#data" className="hover:text-primary transition-colors">
                  Data Explorer
                </a>
              </li>
              <li>
                <a href="#stories" className="hover:text-primary transition-colors">
                  Story Modules
                </a>
              </li>
              <li>
                <a href="#accessibility" className="hover:text-primary transition-colors">
                  Accessibility
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-3 text-foreground/90">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://earthdata.nasa.gov/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  NASA Data Portal
                </a>
              </li>
              <li>
                <a href="https://immersiveweb.dev/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  WebXR Documentation
                </a>
              </li>
              <li>
                <a href="https://www.conservation.org/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Conservation Partners
                </a>
              </li>
              <li>
                <a href="#press" className="hover:text-primary transition-colors">
                  Press Kit
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="pt-8 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Echoes of Earth. Built with NASA's open Earth data.
          </p>
          
          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10 hover:text-primary"
            >
              <Github className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-secondary/10 hover:text-secondary"
            >
              <Twitter className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-accent/10 hover:text-accent"
            >
              <Youtube className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* NASA Acknowledgment */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Data courtesy of NASA's Earth Science Data Systems Program |{" "}
            <a href="https://pace.gsfc.nasa.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              PACE
            </a>{" "}
            •{" "}
            <a href="https://swot.jpl.nasa.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              SWOT
            </a>{" "}
            •{" "}
            <a href="https://gracefo.jpl.nasa.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              GRACE-FO
            </a>{" "}
            •{" "}
            <a href="https://modis.gsfc.nasa.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              MODIS
            </a>{" "}
            •{" "}
            <a href="https://landsat.gsfc.nasa.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Landsat
            </a>{" "}
            •{" "}
            <a href="https://www.earthdata.nasa.gov/sensors/viirs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              VIIRS
            </a>{" "}
            •{" "}
            <a href="https://icesat-2.gsfc.nasa.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              ICESat-2
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
