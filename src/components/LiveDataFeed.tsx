import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Activity, TrendingUp, Waves } from "lucide-react";

const NASA_API_KEY = "Xe92Xkv5r3kQVksG7ICF6lhM8aHfFdubVh0lzTHy";

interface EarthEvent {
  id: string;
  title: string;
  categories: { id: string; title: string }[];
  geometry: { date: string }[];
}

interface ChartDataPoint {
  name: string;
  value: number;
  category: string;
}

export const LiveDataFeed = () => {
  const [events, setEvents] = useState<EarthEvent[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNASAData = async () => {
      try {
        // Fetch EONET (Earth Observatory Natural Event Tracker) data
        const response = await fetch(
          `https://eonet.gsfc.nasa.gov/api/v3/events?api_key=${NASA_API_KEY}&limit=20&status=open`
        );
        const data = await response.json();
        
        if (data.events) {
          setEvents(data.events.slice(0, 10));
          
          // Process data for charts
          const eventsByCategory: Record<string, number> = {};
          data.events.forEach((event: EarthEvent) => {
            event.categories.forEach(cat => {
              eventsByCategory[cat.title] = (eventsByCategory[cat.title] || 0) + 1;
            });
          });

          const processedData = Object.entries(eventsByCategory).map(([name, value]) => ({
            name,
            value,
            category: name,
          }));

          setChartData(processedData);
        }
      } catch (error) {
        console.error("Error fetching NASA data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNASAData();
    const interval = setInterval(fetchNASAData, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen py-20 px-4 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 animate-pulse">
            <Activity className="w-4 h-4 mr-2 inline" />
            Live NASA Data Feed
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Real-Time Earth Events
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Active natural events tracked by NASA satellites, updated in real-time from Earth Observatory Network.
          </p>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="text-primary" />
                Active Events by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-[300px] flex items-center justify-center">
                  <div className="animate-pulse text-muted-foreground">Loading data...</div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--primary))" 
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Waves className="text-secondary" />
                Event Distribution Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-[300px] flex items-center justify-center">
                  <div className="animate-pulse text-muted-foreground">Loading data...</div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--secondary))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--secondary))", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Live Events Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse border-border/50">
                <CardHeader>
                  <div className="h-6 bg-muted rounded" />
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </CardContent>
              </Card>
            ))
          ) : (
            events.map((event) => (
              <Card
                key={event.id}
                className="border-primary/20 bg-card/80 backdrop-blur-sm hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
                    <Activity className="text-primary h-5 w-5 flex-shrink-0 animate-pulse" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {event.categories.map((cat) => (
                      <Badge
                        key={cat.id}
                        variant="secondary"
                        className="text-xs"
                      >
                        {cat.title}
                      </Badge>
                    ))}
                  </div>
                  {event.geometry[0] && (
                    <p className="text-sm text-muted-foreground mt-4">
                      {new Date(event.geometry[0].date).toLocaleDateString()}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
