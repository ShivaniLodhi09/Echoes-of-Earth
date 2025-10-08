import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export const SpaceBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm SpaceBot 🚀 Your guide to exploring NASA's ocean and climate data. Ask me anything about our missions, data, or the science behind ocean observations!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getLocalResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // PACE Mission
    if (lowerMessage.includes("pace") || lowerMessage.includes("plankton") || lowerMessage.includes("ocean color")) {
      return "The PACE (Plankton, Aerosol, Cloud, ocean Ecosystem) mission studies ocean color and atmospheric particles. It helps us understand phytoplankton - tiny organisms that produce half the oxygen we breathe! PACE data reveals ocean health and how it impacts our climate.";
    }
    
    // SWOT Mission
    if (lowerMessage.includes("swot") || lowerMessage.includes("ocean topography") || lowerMessage.includes("current")) {
      return "SWOT (Surface Water and Ocean Topography) measures ocean surface heights with incredible precision. It tracks ocean currents, which are like rivers in the sea, transporting heat and nutrients across the planet. This helps us understand weather patterns and sea level changes.";
    }
    
    // ICESat-2 Mission
    if (lowerMessage.includes("icesat") || lowerMessage.includes("ice") || lowerMessage.includes("polar")) {
      return "ICESat-2 uses laser technology to measure ice sheet elevation and sea ice thickness at the poles. It's tracking how quickly ice is melting due to climate change. Every meter of ice loss contributes to rising sea levels that affect coastal communities worldwide.";
    }
    
    // GRACE-FO Mission
    if (lowerMessage.includes("grace") || lowerMessage.includes("gravity") || lowerMessage.includes("water")) {
      return "GRACE-FO (Gravity Recovery and Climate Experiment Follow-On) measures tiny changes in Earth's gravity field to track water movement. It monitors groundwater, ice mass, and sea level changes, giving us crucial data about Earth's water cycle and climate.";
    }
    
    // VR/Virtual Reality
    if (lowerMessage.includes("vr") || lowerMessage.includes("virtual reality") || lowerMessage.includes("3d")) {
      return "Our VR experience lets you explore ocean and climate data in an immersive 3D environment! You can visualize satellite data, ocean currents, and atmospheric patterns as if you're floating in space. It's a powerful way to understand Earth's interconnected systems.";
    }
    
    // Climate/Ocean general
    if (lowerMessage.includes("climate") || lowerMessage.includes("ocean") || lowerMessage.includes("earth")) {
      return "NASA's ocean missions are crucial for understanding climate change. The ocean absorbs 90% of excess heat from global warming and produces much of our oxygen. By monitoring ocean health, currents, and ice, we can better predict and prepare for climate impacts.";
    }
    
    // Data/Science
    if (lowerMessage.includes("data") || lowerMessage.includes("science") || lowerMessage.includes("research")) {
      return "Our platform visualizes real NASA satellite data in accessible ways. Scientists use this data to study climate patterns, ocean health, and environmental changes. You can explore interactive graphs, live data feeds, and immersive visualizations to understand Earth's systems!";
    }
    
    // Default response
    return "I'm SpaceBot, your guide to NASA's ocean and climate missions! I can tell you about PACE, SWOT, ICESat-2, and GRACE-FO missions, explain our VR experiences, or discuss ocean and climate science. What would you like to explore? 🚀🌊";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageContent = inputValue;
    setInputValue("");
    setIsLoading(true);

    // Simulate a brief delay for more natural interaction
    setTimeout(() => {
      const response = getLocalResponse(messageContent);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 z-50 transition-all duration-300 hover:scale-110"
          aria-label="Open SpaceBot"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col bg-background/95 backdrop-blur-sm border-2 border-blue-500/20">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">SpaceBot</h3>
                <p className="text-xs text-white/80">Your NASA Guide</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.role === "user" ? "text-white/70" : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t bg-background">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about space and oceans..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};
