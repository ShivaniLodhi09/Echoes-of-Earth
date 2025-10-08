import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar
} from 'recharts';

// Mock data for polar ice melt
const iceMeltData = [
  { year: '2010', arctic: 4.9, antarctic: 12.8, greenland: 3.2 },
  { year: '2012', arctic: 4.6, antarctic: 12.7, greenland: 3.0 },
  { year: '2014', arctic: 4.3, antarctic: 12.5, greenland: 2.8 },
  { year: '2016', arctic: 4.1, antarctic: 12.3, greenland: 2.6 },
  { year: '2018', arctic: 3.8, antarctic: 12.0, greenland: 2.4 },
  { year: '2020', arctic: 3.5, antarctic: 11.8, greenland: 2.2 },
  { year: '2022', arctic: 3.2, antarctic: 11.5, greenland: 2.0 },
];

// Mock data for freshwater movement and sea level impact
const waterData = [
  { year: '2010', seaLevel: 0, glacierMelt: 10, groundwater: 5 },
  { year: '2012', seaLevel: 2.1, glacierMelt: 12, groundwater: 7 },
  { year: '2014', seaLevel: 4.3, glacierMelt: 15, groundwater: 9 },
  { year: '2016', seaLevel: 6.2, glacierMelt: 18, groundwater: 11 },
  { year: '2018', seaLevel: 8.4, glacierMelt: 22, groundwater: 14 },
  { year: '2020', seaLevel: 10.5, glacierMelt: 25, groundwater: 16 },
  { year: '2022', seaLevel: 12.7, glacierMelt: 28, groundwater: 19 },
];

interface IceDynamicsVisualProps {
  isOpen: boolean;
  onClose: () => void;
  datasetTitle: string;
}

export const IceDynamicsVisual = ({ isOpen, onClose, datasetTitle }: IceDynamicsVisualProps) => {
  const [activeTab, setActiveTab] = useState<'ice' | 'water'>('ice');

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[1200px] translate-x-[-50%] translate-y-[-50%] rounded-lg border bg-card p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-2xl font-bold">
              {datasetTitle}: Ice & Water Dynamics
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </Dialog.Close>
          </div>
          
          <div className="flex gap-4 mb-6">
            <Button 
              variant={activeTab === 'ice' ? "default" : "outline"}
              onClick={() => setActiveTab('ice')}
              className="flex-1"
            >
              Polar Ice Melt
            </Button>
            <Button 
              variant={activeTab === 'water' ? "default" : "outline"}
              onClick={() => setActiveTab('water')}
              className="flex-1"
            >
              Sea Level Impact
            </Button>
          </div>
          
          <div className="h-[500px] w-full">
            {activeTab === 'ice' ? (
              <>
                <h3 className="text-lg font-medium mb-2">Polar Ice Mass (2010-2022)</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Tracking ice mass changes in trillion metric tons, measured by ICESat-2 and GRACE-FO satellites.
                </p>
                <ResponsiveContainer width="100%" height="80%">
                  <LineChart
                    data={iceMeltData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis label={{ value: 'Ice Mass (trillion tons)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="arctic" stroke="#2196f3" strokeWidth={2} dot={{ r: 4 }} name="Arctic Sea Ice" />
                    <Line type="monotone" dataKey="antarctic" stroke="#3f51b5" strokeWidth={2} dot={{ r: 4 }} name="Antarctic Ice Sheet" />
                    <Line type="monotone" dataKey="greenland" stroke="#00bcd4" strokeWidth={2} dot={{ r: 4 }} name="Greenland Ice Sheet" />
                  </LineChart>
                </ResponsiveContainer>
              </>
            ) : (
              <>
                <h3 className="text-lg font-medium mb-2">Water Movement & Sea Level Rise (2010-2022)</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Showing the relationship between glacier melt, groundwater changes, and global sea level rise.
                </p>
                <ResponsiveContainer width="100%" height="80%">
                  <BarChart
                    data={waterData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis label={{ value: 'Change (mm/year)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="glacierMelt" fill="#2196f3" name="Glacier Melt Contribution" />
                    <Bar dataKey="groundwater" fill="#4caf50" name="Groundwater Depletion" />
                    <Line type="monotone" dataKey="seaLevel" stroke="#f44336" strokeWidth={3} name="Global Sea Level Rise" />
                  </BarChart>
                </ResponsiveContainer>
              </>
            )}
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Data source: ICESat-2 laser altimetry and GRACE-FO gravity measurements, 2010-2022.</p>
            <p className="mt-2">This visualization demonstrates how these satellites track the movement of water between ice sheets, oceans, and land, providing critical insights into climate change impacts.</p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};