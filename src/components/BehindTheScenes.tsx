import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Cpu, Palette, Globe } from "lucide-react";

const process = [
  {
    icon: Database,
    title: "Data Collection",
    description: "Aggregating NASA's Earth observation datasets from multiple satellites and sensors.",
  },
  {
    icon: Cpu,
    title: "Processing & Analysis",
    description: "Applying algorithms to transform raw data into meaningful visualizations.",
  },
  {
    icon: Palette,
    title: "Artistic Transformation",
    description: "Translating scientific measurements into emotionally resonant experiences.",
  },
  {
    icon: Globe,
    title: "Immersive Integration",
    description: "Building WebXR environments with spatial audio and interactive narratives.",
  },
];

export const BehindTheScenes = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen py-20 px-4 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
            How It's Made
          </Badge>
          <h2
            className={`text-5xl md:text-6xl font-bold mb-6 ${
              isVisible ? "animate-slide-up" : "opacity-0"
            }`}
          >
            Behind the Scenes
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-3xl mx-auto ${
              isVisible ? "animate-slide-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            Discover how we transform NASA's scientific data into an immersive
            emotional journey through Earth's systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {process.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={step.title}
                className={`bg-card/50 backdrop-blur-sm border-2 border-foreground/10 hover:border-primary/30 transition-all duration-300 ${
                  isVisible ? "animate-slide-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Credits Section */}
        <div
          className={`text-center space-y-4 ${
            isVisible ? "animate-scale-in" : "opacity-0"
          }`}
          style={{ animationDelay: "0.7s" }}
        >
          <h3 className="text-2xl font-bold text-foreground/90">Data Sources & Credits</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {["PACE", "SWOT", "GRACE-FO", "MODIS", "Landsat", "VIIRS", "ICESat-2"].map((source) => (
              <Badge
                key={source}
                variant="outline"
                className="border-primary/30 text-primary px-4 py-2"
              >
                {source}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mt-6">
            This project uses publicly available NASA Earth observation data.
            Special thanks to NASA's Earth Science Data Systems Program and all
            the scientists and engineers who make this data accessible.
          </p>
        </div>
      </div>
    </section>
  );
};
