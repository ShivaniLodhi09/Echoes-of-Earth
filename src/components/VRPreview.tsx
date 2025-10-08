import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Monitor, Headset, Play } from "lucide-react";
import vrPreview from "@/assets/vr-preview.jpg";
import WebXRScene from "./WebXRScene";
import { VideoModal } from "./VideoModal";

export const VRPreview = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showVR, setShowVR] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const handleOpen360Video = () => {
    setVideoUrl("https://www.youtube.com/embed/hEdzv7D4CbQ?si=NrI7kk31nPHbFdfh&start=100");
    setShowVideo(true);
  };

  const handleEnterVRExperience = () => {
    setVideoUrl("https://www.youtube.com/embed/Lp_AclAXXb4?si=g3ok7U8iHqRYTFz_&start=100&modestbranding=1&controls=1&rel=0&showinfo=0&iv_load_policy=3");
    setShowVideo(true);
  };

  const handleWatchTrailer = () => {
    setVideoUrl("/src/components/Glaciervideo.mp4");
    setShowVideo(true);
  };

  return (
    <section
      id="vr"
      ref={sectionRef}
      className="min-h-screen py-20 px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-ocean opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-5xl md:text-6xl font-bold mb-6 transition-opacity duration-700 ${isVisible ? "animate-slide-up" : "opacity-0"
              }`}
          >
            Immerse Yourself
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-3xl mx-auto transition-opacity duration-700 ${isVisible ? "animate-slide-up" : "opacity-0"
              }`}
            style={{ animationDelay: "0.2s" }}
          >
            Enter a virtual reality world where Earth's data comes alive through sight, sound, and emotion.
          </p>
        </div>

        <div className="relative mb-12">
          {showVR ? (
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-primary/30 h-[600px]">
              <WebXRScene />
              <Button
                aria-label="Exit VR"
                className="absolute top-4 left-4 z-20 bg-background/80 hover:bg-background"
                onClick={() => setShowVR(false)}
              >
                <Monitor className="mr-2 h-5 w-5" />
                Exit VR
              </Button>
            </div>
          ) : (
            <div
              className={`relative aspect-video rounded-2xl overflow-hidden border border-primary/30 transition-opacity duration-700 ${isVisible ? "animate-scale-in" : "opacity-0"
                }`}
              style={{ animationDelay: "0.4s" }}
            >
              <img
                src={vrPreview}
                alt="Preview of immersive ocean and atmosphere data in VR"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

              <div className="absolute top-8 left-8 bg-card/90 backdrop-blur-sm p-4 rounded-lg border border-primary/20 animate-float">
                <p className="text-sm text-secondary font-semibold">Ocean Layer</p>
                <p className="text-xs text-muted-foreground">PACE & SWOT Data</p>
              </div>
              <div className="absolute bottom-8 right-8 bg-card/90 backdrop-blur-sm p-4 rounded-lg border border-accent/20 animate-drift">
                <p className="text-sm text-accent font-semibold">Atmosphere Layer</p>
                <p className="text-xs text-muted-foreground">MODIS & VIIRS Data</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            aria-label="Enter VR Experience"
            className={`bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg animate-glow transition-opacity duration-700 ${isVisible ? "animate-slide-up" : "opacity-0"
              }`}
            style={{ animationDelay: "0.6s" }}
            onClick={handleEnterVRExperience}
          >
            <Headset className="mr-2 h-5 w-5" />
            Enter VR Experience
          </Button>
          <Button
            size="lg"
            variant="outline"
            aria-label="View 360 Degree Version"
            className={`border-secondary text-secondary hover:bg-secondary/10 px-8 py-6 text-lg transition-opacity duration-700 ${isVisible ? "animate-slide-up" : "opacity-0"
              }`}
            style={{ animationDelay: "0.7s" }}
            onClick={handleOpen360Video}
          >
            <Monitor className="mr-2 h-5 w-5" />
            View 360° Version
          </Button>
          <Button
            size="lg"
            variant="outline"
            aria-label="Watch Trailer"
            className={`border-foreground/30 px-8 py-6 text-lg transition-opacity duration-700 ${isVisible ? "animate-slide-up" : "opacity-0"
              }`}
            style={{ animationDelay: "0.8s" }}
            onClick={handleWatchTrailer}
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Trailer
          </Button>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={showVideo}
        onClose={() => setShowVideo(false)}
        videoUrl={videoUrl}
      />
    </section>
  );
};