import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, Play, VolumeX } from "lucide-react";
import oceanData from "@/assets/ocean-data.jpg";
import groundwaterData from "@/assets/groundwater-data.jpg";

interface StoryModuleProps {
  title: string;
  subtitle: string;
  description: string;
  dataSource: string;
  imagePosition: "left" | "right";
  gradient: string;
  videoUrl?: string;
  imageUrl?: string;
}

export const StoryModule = ({
  title,
  subtitle,
  description,
  dataSource,
  imagePosition,
  gradient,
  videoUrl,
  imageUrl,
}: StoryModuleProps) => {
  const moduleRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [spatialAudioEnabled, setSpatialAudioEnabled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (moduleRef.current) {
      observer.observe(moduleRef.current);
    }

    return () => observer.disconnect();
  }, []);
  
  // Function to toggle spatial audio
  const toggleSpatialAudio = () => {
    const newState = !spatialAudioEnabled;
    setSpatialAudioEnabled(newState);
    
    // Control local video's audio
    if (localVideoRef.current) {
      localVideoRef.current.muted = !newState;
    }
    
    // Control YouTube iframe's audio
    if (videoRef.current) {
      const iframe = videoRef.current;
      const message = newState 
        ? JSON.stringify({ event: 'command', func: 'unMute' })
        : JSON.stringify({ event: 'command', func: 'mute' });
      
      iframe.contentWindow?.postMessage(message, '*');
    }
  };

  return (
    <section
      ref={moduleRef}
      className="min-h-screen flex items-center py-20 px-4 relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 ${gradient} opacity-10`} />

      <div className={`max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center ${
        imagePosition === "right" ? "" : "md:grid-flow-dense"
      }`}>
        {/* Text Content */}
        <div
          className={`space-y-6 ${
            isVisible ? "animate-slide-up" : "opacity-0"
          } ${imagePosition === "right" ? "" : "md:col-start-2"}`}
        >
          <div>
            <p className="text-sm text-primary font-semibold uppercase tracking-wider mb-2">
              {dataSource}
            </p>
            <h3 className="text-4xl md:text-5xl font-bold mb-4">
              {title}
            </h3>
            <p className="text-xl text-secondary font-semibold mb-6">
              {subtitle}
            </p>
          </div>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-3">
            {videoUrl && (
              <Button
                variant="outline"
                className={`border-primary/50 hover:bg-primary/10 group ${spatialAudioEnabled ? 'bg-primary/20' : ''}`}
                onClick={toggleSpatialAudio}
              >
                {spatialAudioEnabled ? (
                  <Volume2 className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                ) : (
                  <VolumeX className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                )}
                {spatialAudioEnabled ? "Disable Spatial Audio" : "Enable Spatial Audio"}
              </Button>
            )}
          </div>
        </div>

        {/* Image/Visualization or Video */}
        <div
          className={`relative ${
            isVisible ? "animate-scale-in" : "opacity-0"
          } ${imagePosition === "left" ? "" : "md:col-start-2"}`}
          style={{ animationDelay: "0.3s" }}
        >
          <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-primary/20">
            {videoUrl && !imageUrl ? (
              // Check if it's a local video file or YouTube URL
              videoUrl.endsWith('.mp4') || videoUrl.endsWith('.webm') || videoUrl.endsWith('.ogg') ? (
                <video
                  ref={localVideoRef}
                  src={videoUrl}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  loop
                  muted={!spatialAudioEnabled}
                  controlsList="nodownload"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <iframe
                  ref={videoRef}
                  src={`${videoUrl}?enablejsapi=1&origin=${window.location.origin}`}
                  title={title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              )
            ) : (
              <>
                <img
                  src={imageUrl === "groundwater-data" ? groundwaterData : oceanData}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 ${gradient} mix-blend-overlay opacity-40`} />
                
                {/* Floating Data Point */}
                <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-primary rounded-full animate-pulse-slow shadow-lg" style={{ boxShadow: "0 0 20px hsl(var(--primary))" }} />
                <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-secondary rounded-full animate-float shadow-lg" style={{ boxShadow: "0 0 15px hsl(var(--secondary))" }} />
              </>
            )}
          </div>

          {/* Data Overlay Card */}
          <div className="absolute -bottom-6 -right-6 bg-card/90 backdrop-blur-sm p-6 rounded-xl border border-primary/30 animate-drift">
            <p className="text-2xl font-bold text-primary">Real-Time</p>
            <p className="text-sm text-muted-foreground">NASA Data Stream</p>
          </div>
        </div>
      </div>
    </section>
  );
};
