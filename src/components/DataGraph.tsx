import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Waves } from "lucide-react";

interface DataGraphProps {
  isOpen: boolean;
  onClose: () => void;
  datasetTitle: string;
}

interface DataPoint {
  date: string;
  value: number;
}

export const DataGraph = ({ isOpen, onClose, datasetTitle }: DataGraphProps) => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && datasetTitle === "SWOT") {
      fetchSWOTData();
    }
  }, [isOpen, datasetTitle]);

  const fetchSWOTData = async () => {
    setLoading(true);
    try {
      // Simulate API call with mock data for SWOT sea level measurements
      // In a real app, this would be a call to NASA's API
      setTimeout(() => {
        const mockData = [
          { date: "Jan", value: 2.3 },
          { date: "Feb", value: 2.5 },
          { date: "Mar", value: 2.4 },
          { date: "Apr", value: 2.6 },
          { date: "May", value: 2.8 },
          { date: "Jun", value: 3.0 },
          { date: "Jul", value: 3.1 },
          { date: "Aug", value: 3.2 },
          { date: "Sep", value: 3.0 },
          { date: "Oct", value: 2.9 },
          { date: "Nov", value: 2.7 },
          { date: "Dec", value: 2.6 },
        ];
        setData(mockData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching SWOT data:", error);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-[90vw] max-w-[800px] bg-background p-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Waves className="text-primary h-5 w-5" />
            {datasetTitle} Data Visualization
          </CardTitle>
          <button 
            onClick={onClose}
            className="rounded-full h-8 w-8 inline-flex items-center justify-center text-muted-foreground hover:bg-muted focus:outline-none"
            aria-label="Close"
          >
            ✕
          </button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-[300px] flex items-center justify-center">
              <div className="animate-pulse text-muted-foreground">Loading data...</div>
            </div>
          ) : (
            <>
              <p className="mb-4 text-muted-foreground">
                Sea level measurements from the SWOT satellite mission, showing changes over time.
              </p>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      label={{ value: 'Sea Level (m)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};