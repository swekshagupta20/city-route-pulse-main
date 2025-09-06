import { motion } from 'framer-motion';
import { Map, Navigation, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MapPlaceholderProps {
  selectedBus: any;
  refreshTimer: number;
}

const MapPlaceholder = ({ selectedBus, refreshTimer }: MapPlaceholderProps) => {
  return (
    // Add pt-16 (or adjust for your navbar height)
    <div className="glass-card h-full relative overflow-hidden pt-16">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6 bg-gradient-to-b from-card/90 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Map className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Live Tracking</h2>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1 glass border border-card-border rounded-full">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">
                Refreshing in {refreshTimer}s
              </span>
            </div>
            <Button variant="outline" size="sm">
              <Navigation className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-muted/20" />
            ))}
          </div>
        </div>
      </div>

      {/* Map Content */}
      <div className="relative h-full flex items-center justify-center p-6 pt-24">
        <div className="text-center max-w-md">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-full flex items-center justify-center shadow-primary">
              <Map className="w-12 h-12 text-primary-foreground" />
            </div>
          </motion.div>
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Live Map Integration Coming Soon
          </h3>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Real-time GPS tracking with Google Maps integration will be available soon.
            Track your bus location, route progress, and estimated arrival times on an interactive map.
          </p>
          <div className="space-y-4">
            <div className="text-left">
              <h4 className="font-semibold text-foreground mb-3">Upcoming Features:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Real-time bus location tracking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  <span>Interactive route visualization</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span>Traffic-aware ETA updates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-warning"></div>
                  <span>Nearby stops and landmarks</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* No Route Stops or progress bar! */}
    </div>
  );
};

export default MapPlaceholder;
