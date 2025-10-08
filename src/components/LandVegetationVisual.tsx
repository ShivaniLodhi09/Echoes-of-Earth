import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

// Mock data for vegetation health index over time
const vegetationData = [
  { year: '2018', forest: 85, agriculture: 70, urban: 40 },
  { year: '2019', forest: 83, agriculture: 68, urban: 38 },
  { year: '2020', forest: 80, agriculture: 65, urban: 35 },
  { year: '2021', forest: 78, agriculture: 67, urban: 36 },
  { year: '2022', forest: 75, agriculture: 64, urban: 34 },
  { year: '2023', forest: 73, agriculture: 66, urban: 33 },
];

// Mock data for coastal change measurements
const coastalData = [
  { year: '2018', erosion: -2.1, accretion: 1.2, netChange: -0.9 },
  { year: '2019', erosion: -2.3, accretion: 1.1, netChange: -1.2 },
  { year: '2020', erosion: -2.5, accretion: 0.9, netChange: -1.6 },
  { year: '2021', erosion: -2.7, accretion: 0.8, netChange: -1.9 },
  { year: '2022', erosion: -3.0, accretion: 0.7, netChange: -2.3 },
  { year: '2023', erosion: -3.2, accretion: 0.6, netChange: -2.6 },
];

interface LandVegetationVisualProps {
  isOpen: boolean;
  onClose: () => void;
  datasetTitle: string;
}

export const LandVegetationVisual = ({ isOpen, onClose, datasetTitle }: LandVegetationVisualProps) => {
  const [activeTab, setActiveTab] = useState<'vegetation' | 'coastal'>('vegetation');

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[1200px] translate-x-[-50%] translate-y-[-50%] rounded-lg border bg-card p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-2xl font-bold">
              {datasetTitle}: Land & Vegetation Analysis
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
              variant={activeTab === 'vegetation' ? "default" : "outline"}
              onClick={() => setActiveTab('vegetation')}
              className="flex-1"
            >
              Vegetation Health
            </Button>
            <Button 
              variant={activeTab === 'coastal' ? "default" : "outline"}
              onClick={() => setActiveTab('coastal')}
              className="flex-1"
            >
              Coastal Changes
            </Button>
          </div>
          
          <div className="h-[500px] w-full">
            {activeTab === 'vegetation' ? (
              <>
                <h3 className="text-lg font-medium mb-2">Vegetation Health Index (2018-2023)</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Comparing vegetation health across different land use types, measured by Landsat's Enhanced Vegetation Index (EVI).
                </p>
                <ResponsiveContainer width="100%" height="80%">
                  <AreaChart
                    data={vegetationData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis label={{ value: 'Health Index (0-100)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="forest" stackId="1" stroke="#2e7d32" fill="#4caf50" name="Forest Areas" />
                    <Area type="monotone" dataKey="agriculture" stackId="2" stroke="#f9a825" fill="#fdd835" name="Agricultural Land" />
                    <Area type="monotone" dataKey="urban" stackId="3" stroke="#616161" fill="#9e9e9e" name="Urban Areas" />
                  </AreaChart>
                </ResponsiveContainer>
              </>
            ) : (
              <>
                <h3 className="text-lg font-medium mb-2">Coastal Change Analysis (2018-2023)</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Measuring coastal erosion and accretion rates in meters per year, based on Landsat time-series analysis.
                </p>
                <ResponsiveContainer width="100%" height="80%">
                  <AreaChart
                    data={coastalData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis label={{ value: 'Change (meters/year)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="erosion" stroke="#d32f2f" fill="#ef5350" name="Erosion (loss)" />
                    <Area type="monotone" dataKey="accretion" stroke="#1976d2" fill="#42a5f5" name="Accretion (gain)" />
                    <Area type="monotone" dataKey="netChange" stroke="#7b1fa2" fill="#9c27b0" name="Net Change" />
                  </AreaChart>
                </ResponsiveContainer>
              </>
            )}
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Data source: Landsat satellite imagery analysis from 2018-2023.</p>
            <p className="mt-2">This visualization demonstrates how Landsat data helps scientists monitor changes in vegetation health and coastal landscapes over time.</p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};