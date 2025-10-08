import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accessibility, Subtitles, Palette, User, ExternalLink } from "lucide-react";

const features = [
  {
    icon: Subtitles,
    title: "Subtitles & Audio Descriptions",
    description: "Full WebVTT subtitles and audio descriptions for all content.",
  },
  {
    icon: Palette,
    title: "Color-Safe Mode",
    description: "High contrast and colorblind-friendly visual options.",
  },
  {
    icon: User,
    title: "Seated Navigation",
    description: "Fully accessible VR experience without room-scale movement.",
  },
  {
    icon: Accessibility,
    title: "Assistive Tech Compatible",
    description: "Screen reader support and keyboard navigation throughout.",
  },
];

export const AccessibilitySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);
  const [colorSafeMode, setColorSafeMode] = useState(false);
  const [seatedMode, setSeatedMode] = useState(false);
  const [assistiveTech, setAssistiveTech] = useState(false);

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

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <section id="accessibility" ref={sectionRef} className="min-h-screen py-20 px-4 bg-gradient-ocean/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
            For Everyone
          </Badge>
          <h2
            className={`text-5xl md:text-6xl font-bold mb-6 ${
              isVisible ? "animate-slide-up" : "opacity-0"
            }`}
          >
            Accessibility & Impact
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-3xl mx-auto ${
              isVisible ? "animate-slide-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            Echoes of Earth is designed to be experienced by everyone, regardless of ability.
            Inclusivity is at the heart of our mission.
          </p>
        </div>

        {/* Accessibility Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = 
              (feature.title === "Subtitles & Audio Descriptions" && subtitlesEnabled) ||
              (feature.title === "Color-Safe Mode" && colorSafeMode) ||
              (feature.title === "Seated Navigation" && seatedMode) ||
              (feature.title === "Assistive Tech Compatible" && assistiveTech);
            
            const handleClick = () => {
              if (feature.title === "Subtitles & Audio Descriptions") setSubtitlesEnabled(!subtitlesEnabled);
              if (feature.title === "Color-Safe Mode") setColorSafeMode(!colorSafeMode);
              if (feature.title === "Seated Navigation") setSeatedMode(!seatedMode);
              if (feature.title === "Assistive Tech Compatible") setAssistiveTech(!assistiveTech);
            };
            
            return (
              <Card
                key={feature.title}
                className={`bg-card/80 backdrop-blur-sm border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
                  isActive ? 'border-accent bg-accent/10' : 'border-foreground/10'
                } ${
                  isVisible ? "animate-scale-in" : "opacity-0"
                }`}
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                onClick={handleClick}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg transition-colors ${
                      isActive ? 'bg-accent text-accent-foreground' : 'bg-accent/20'
                    }`}>
                      <Icon className={`h-6 w-6 ${
                        isActive ? 'text-accent-foreground' : 'text-accent'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full transition-all ${
                          isActive ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
                        }`}>
                          {isActive ? 'ON' : 'OFF'}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Impact Section */}
        <div
          className={`text-center space-y-8 ${
            isVisible ? "animate-slide-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.7s" }}
        >
          <div>
            <h3 className="text-3xl font-bold mb-4">Create Your Ripple of Change</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Every action creates waves. Explore resources and join efforts to protect
              our planet's oceans and climate systems.
            </p>
          </div>

          <div className="relative inline-block">
            <Button
              size="lg"
              onClick={(e) => {
                createRipple(e);
                setTimeout(() => window.open('https://www.conservation.org/', '_blank'), 300);
              }}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-12 py-6 text-lg relative overflow-hidden"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Explore Conservation Resources
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className="absolute bg-foreground/20 rounded-full animate-ping"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: "20px",
                    height: "20px",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button 
              variant="outline" 
              className="border-primary/30 hover:bg-primary/10"
              onClick={() => window.open('https://climate.nasa.gov/', '_blank')}
            >
              NASA Climate Resources
            </Button>
            <Button 
              variant="outline" 
              className="border-secondary/30 hover:bg-secondary/10"
              onClick={() => window.open('https://www.zooniverse.org/', '_blank')}
            >
              Citizen Science Projects
            </Button>
            <Button 
              variant="outline" 
              className="border-accent/30 hover:bg-accent/10"
              onClick={() => window.open('https://www.conservation.org/priorities/ocean-conservation', '_blank')}
            >
              Ocean Conservation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
