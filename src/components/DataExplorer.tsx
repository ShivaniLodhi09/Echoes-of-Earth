import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Waves, Cloud, Leaf, Snowflake, Activity, Play, BarChart, Globe, LineChart, Map } from "lucide-react";
import { Button } from "./ui/button";
import { VideoModal } from "./VideoModal";
import { DataGraph } from "./DataGraph";
import { AtmosphereModel } from "./AtmosphereModel";
import { LandVegetationVisual } from "./LandVegetationVisual";
import { IceDynamicsVisual } from "./IceDynamicsVisual";

const datasets = [
  {
    icon: Activity,
    title: "PACE",
    subtitle: "Ocean Color & Plankton",
    description: "Track phytoplankton blooms and ocean productivity, revealing the breathing rhythm of our seas.",
    color: "text-secondary",
    borderColor: "border-secondary/30",
    videoUrl: "https://www.youtube.com/embed/JyjjiEQq6uI?si=P84C85U7NSg8xqWH"
  },
  {
    icon: Waves,
    title: "SWOT",
    subtitle: "Sea Level & Currents",
    description: "Measure ocean circulation patterns and sea-level changes with unprecedented precision.",
    color: "text-primary",
    borderColor: "border-primary/30",
    videoUrl: "https://www.youtube.com/watch?v=p4pWafuvdrY"
  },
  {
    icon: Cloud,
    title: "MODIS & VIIRS",
    subtitle: "Atmosphere & Aerosols",
    description: "Monitor clouds, aerosols, and atmospheric flows that connect Earth's systems.",
    color: "text-foreground",
    borderColor: "border-foreground/20",
    videoUrl: "https://youtu.be/xx-0pMlleTM?si=Q0ioBySz_199FsKJ"
  },
  {
    icon: Leaf,
    title: "Landsat",
    subtitle: "Land & Vegetation",
    description: "Observe coastal changes, vegetation health, and the pulse of life on land.",
    color: "text-accent",
    borderColor: "border-accent/30",
  },
  {
    icon: Snowflake,
    title: "ICESat-2 & GRACE-FO",
    subtitle: "Ice & Water Dynamics",
    description: "Track polar ice melt, freshwater movement, and their impact on sea levels.",
    color: "text-secondary",
    borderColor: "border-secondary/30",
    videoUrl: "https://www.youtube.com/watch?v=_vqOraF15aQ"
  },
];

export const DataExplorer = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [graphModalOpen, setGraphModalOpen] = useState(false);
  const [atmosphereModelOpen, setAtmosphereModelOpen] = useState(false);
  const [landVegetationOpen, setLandVegetationOpen] = useState(false);
  const [iceDynamicsOpen, setIceDynamicsOpen] = useState(false);
  const [currentDataset, setCurrentDataset] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = sectionRef.current?.querySelectorAll("[data-index]");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const handlePlayVideo = (videoUrl: string) => {
    if (videoUrl) {
      setCurrentVideoUrl(videoUrl);
      setVideoModalOpen(true);
    }
  };

  const handleShowGraph = (datasetTitle: string) => {
    setCurrentDataset(datasetTitle);
    setGraphModalOpen(true);
  };
  
  const handleShowAtmosphereModel = (datasetTitle: string) => {
    setCurrentDataset(datasetTitle);
    setAtmosphereModelOpen(true);
  };

  const handleShowLandVegetation = (datasetTitle: string) => {
    setCurrentDataset(datasetTitle);
    setLandVegetationOpen(true);
  };

  const handleShowIceDynamics = (datasetTitle: string) => {
    setCurrentDataset(datasetTitle);
    setIceDynamicsOpen(true);
  };

  return (
    <section id="data" ref={sectionRef} className="min-h-screen py-20 px-4 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
            NASA Earth Observation
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Data That Tells Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the datasets that power Echoes of Earth, transforming scientific measurements
            into immersive narratives about our planet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {datasets.map((dataset, index) => {
            const Icon = dataset.icon;
            const isVisible = visibleCards.includes(index);
            const animationClass = index % 2 === 0 ? "animate-slide-in-left" : "animate-slide-in-right";

            return (
              <Card
                key={dataset.title}
                data-index={index}
                className={`${dataset.borderColor} border-2 bg-card/80 backdrop-blur-sm hover:scale-105 transition-transform duration-300 ${
                  isVisible ? animationClass : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className={`h-8 w-8 ${dataset.color}`} />
                    <CardTitle className="text-2xl">{dataset.title}</CardTitle>
                  </div>
                  <p className={`text-sm ${dataset.color} font-semibold`}>
                    {dataset.subtitle}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {dataset.description}
                  </p>
                  <div className="flex flex-col gap-2">
                    {dataset.videoUrl && (
                      <Button 
                        variant="outline" 
                        className={`${dataset.borderColor} hover:bg-secondary/10 w-full`}
                        onClick={() => handlePlayVideo(dataset.videoUrl)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Watch Video
                      </Button>
                    )}
                    {dataset.title === "SWOT" && (
                      <Button 
                        variant="outline" 
                        className={`${dataset.borderColor} hover:bg-primary/10 w-full`}
                        onClick={() => handleShowGraph(dataset.title)}
                      >
                        <BarChart className="h-4 w-4 mr-2" />
                        View Data
                      </Button>
                    )}
                    {dataset.title === "MODIS & VIIRS" && (
                      <Button 
                        variant="outline" 
                        className={`${dataset.borderColor} hover:bg-foreground/10 w-full`}
                        onClick={() => handleShowAtmosphereModel(dataset.title)}
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        View 3D Model
                      </Button>
                    )}
                    {dataset.title === "Landsat" && (
                      <Button 
                        variant="outline" 
                        className={`${dataset.borderColor} hover:bg-accent/10 w-full`}
                        onClick={() => handleShowLandVegetation(dataset.title)}
                      >
                        <Map className="h-4 w-4 mr-2" />
                        View Vegetation Data
                      </Button>
                    )}
                    {dataset.title === "ICESat-2 & GRACE-FO" && (
                      <Button 
                        variant="outline" 
                        className={`${dataset.borderColor} hover:bg-secondary/10 w-full`}
                        onClick={() => handleShowIceDynamics(dataset.title)}
                      >
                        <LineChart className="h-4 w-4 mr-2" />
                        View Ice Data
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <VideoModal 
        isOpen={videoModalOpen} 
        onClose={() => setVideoModalOpen(false)} 
        videoUrl={currentVideoUrl} 
      />

      <DataGraph
        isOpen={graphModalOpen}
        onClose={() => setGraphModalOpen(false)}
        datasetTitle={currentDataset}
      />

      <AtmosphereModel
        isOpen={atmosphereModelOpen}
        onClose={() => setAtmosphereModelOpen(false)}
        datasetTitle={currentDataset}
      />

      <LandVegetationVisual
        isOpen={landVegetationOpen}
        onClose={() => setLandVegetationOpen(false)}
        datasetTitle={currentDataset}
      />

      <IceDynamicsVisual
        isOpen={iceDynamicsOpen}
        onClose={() => setIceDynamicsOpen(false)}
        datasetTitle={currentDataset}
      />
    </section>
  );
};
