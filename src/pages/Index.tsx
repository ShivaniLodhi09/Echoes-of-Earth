import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { VRPreview } from "@/components/VRPreview";
import { DataExplorer } from "@/components/DataExplorer";
import { LiveDataFeed } from "@/components/LiveDataFeed";
import { StoryModule } from "@/components/StoryModule";
import { BehindTheScenes } from "@/components/BehindTheScenes";
import { AccessibilitySection } from "@/components/AccessibilitySection";
import { Footer } from "@/components/Footer";
import { SpaceBot } from "@/components/SpaceBot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <HeroSection />
      
      <VRPreview />
      
      <DataExplorer />
      
      <LiveDataFeed />
      
      {/* Story Modules */}
      <div id="stories">
      <StoryModule
        title="The Breathing Ocean"
        subtitle="PACE: Plankton, Aerosol, Cloud, ocean Ecosystem"
        description="Witness the invisible breath of our oceans. Phytoplankton, microscopic organisms responsible for half the oxygen we breathe, create spectacular blooms visible from space. PACE satellite data reveals these living patterns, showing how ocean health directly impacts our atmosphere and climate."
        dataSource="NASA PACE Mission"
        imagePosition="left"
        gradient="bg-gradient-ocean"
        videoUrl="https://www.youtube.com/embed/JyjjiEQq6uI?si=P84C85U7NSg8xqWH"
      />
      
      <StoryModule
        title="Currents of Change"
        subtitle="SWOT: Surface Water and Ocean Topography"
        description="Follow the rivers in the sea. Ocean currents transport heat, nutrients, and life across our planet. SWOT's precision measurements reveal how these liquid highways are shifting with climate change, affecting weather patterns, sea levels, and marine ecosystems worldwide."
        dataSource="NASA SWOT Mission"
        imagePosition="right"
        gradient="bg-gradient-atmosphere"
        videoUrl="https://www.youtube.com/embed/fi4qY7Z5ZKo?si=rrVZOfiX4EeLIVDr"
      />
      
      <StoryModule
        title="Frozen Signals"
        subtitle="ICESat-2 & GRACE-FO: Ice and Gravity"
        description="Listen to the ice sheets speak. Polar ice holds Earth's climate history and shapes our future. ICESat-2 laser pulses and GRACE-FO gravity measurements track every meter of melt, showing us the accelerating transformation of our frozen frontiers and their impact on rising seas."
        dataSource="NASA ICESat-2 & GRACE-FO"
        imagePosition="left"
        gradient="bg-gradient-aurora"
        videoUrl="https://www.youtube.com/embed/OQg5ov6zths?si=OBA94LLJxwhY5sro"
      />
      </div>
      
      <BehindTheScenes />
      
      <AccessibilitySection />
      
      <Footer />
      
      <SpaceBot />
    </div>
  );
};

export default Index;
