import { motion } from 'framer-motion';
import { Bus, Clock, MapPin, Route, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Bus {
  id: string;
  busNumber: string;
  busName: string;
  route: {
    source: string;
    destination: string;
    via: string;
  };
  currentStatus: string;
  progress: number;
  distanceCovered: number;
  totalDistance: number;
  timeElapsed: number;
  estimatedTimeRemaining: number;
  eta: string;
  delayMinutes: number;
  driver: {
    name: string;
    phone: string;
    experience: string;
  };
  currentLocation: {
    nearestStop: string;
  };
}

interface BusDetailsCardProps {
  bus: Bus;
  onContactDriver: (driver: Bus['driver']) => void;
}

const BusDetailsCard = ({ bus, onContactDriver }: BusDetailsCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'on time': return 'success';
      case 'delayed': return 'warning';
      case 'arrived': return 'primary';
      default: return 'muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'on time': return <CheckCircle className="w-5 h-5" />;
      case 'delayed': return <AlertCircle className="w-5 h-5" />;
      case 'arrived': return <CheckCircle className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
    >
      <div className="p-5"> {/* slightly less padding for compactness */}
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-2xl bg-gradient-primary">
              <Bus className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground leading-5">{bus.busNumber}</h2>
              <p className="text-base text-muted-foreground leading-4">{bus.busName}</p>
            </div>
          </div>

          <div className={`flex items-center space-x-1 px-3 py-1 rounded-full bg-${getStatusColor(bus.currentStatus)}/20 border border-${getStatusColor(bus.currentStatus)}/30`}>
            <span className={`text-${getStatusColor(bus.currentStatus)}`}>
              {getStatusIcon(bus.currentStatus)}
            </span>
            <span className={`font-semibold text-${getStatusColor(bus.currentStatus)} text-sm`}>
              {bus.currentStatus}
            </span>
          </div>
        </div>

        {/* Route Information */}
        <div className="mb-5">
          <div className="flex items-center space-x-2 mb-2">
            <Route className="w-4 h-4 text-primary" />
            <h3 className="text-base font-semibold text-foreground">Route Details</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 glass border border-card-border rounded-xl text-sm">
              <span className="font-medium">From</span>
              <span className="text-muted-foreground">{bus.route.source}</span>
            </div>
            <div className="flex items-center justify-between p-2 glass border border-card-border rounded-xl text-sm">
              <span className="font-medium">To</span>
              <span className="text-muted-foreground">{bus.route.destination}</span>
            </div>
            <div className="p-2 glass border border-card-border rounded-xl text-sm">
              <div className="flex items-center space-x-2 mb-1">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">Via</span>
              </div>
              <span className="text-muted-foreground ml-5">{bus.route.via}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <div className="text-center p-2 glass border border-card-border rounded-xl">
            <div className="text-lg font-bold text-foreground">{bus.timeElapsed}</div>
            <div className="text-xs text-muted-foreground">Minutes Elapsed</div>
          </div>
          <div className="text-center p-2 glass border border-card-border rounded-xl">
            <div className="text-lg font-bold text-primary">{bus.estimatedTimeRemaining}</div>
            <div className="text-xs text-muted-foreground">Minutes Remaining</div>
          </div>
          <div className="text-center p-2 glass border border-card-border rounded-xl">
            <div className="text-lg font-bold text-foreground">{bus.distanceCovered}km</div>
            <div className="text-xs text-muted-foreground">Distance Covered</div>
          </div>
          <div className="text-center p-2 glass border border-card-border rounded-xl">
            <div className="text-lg font-bold text-secondary">{bus.eta}</div>
            <div className="text-xs text-muted-foreground">Expected Arrival</div>
          </div>
        </div>

        {/* Current Location */}
        <div className="mb-4 p-2 glass border border-card-border rounded-xl text-sm">
          <div className="flex items-center space-x-2 mb-1">
            <MapPin className="w-4 h-4 text-primary" />
            <h4 className="font-semibold text-base text-foreground">Current Location</h4>
          </div>
          <p className="ml-6 text-muted-foreground">{bus.currentLocation.nearestStop}</p>
          <div className="ml-6 mt-2">
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${bus.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-2 bg-gradient-to-r from-success to-primary rounded-full"
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{bus.progress}% Complete</span>
              <span>{bus.totalDistance - bus.distanceCovered}km remaining</span>
            </div>
          </div>
        </div>

        {/* Delay Warning */}
        {bus.delayMinutes > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-3 bg-warning/20 border border-warning/30 rounded-xl"
          >
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              <div>
                <p className="font-semibold text-warning text-sm">Service Delay</p>
                <p className="text-xs text-warning/80">
                  This bus is running {bus.delayMinutes} minutes behind schedule
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Driver Contact */}
        <div className="flex items-center justify-between p-2 glass border border-card-border rounded-xl text-sm">
          <div>
            <p className="font-semibold text-foreground">Driver: {bus.driver.name}</p>
            <p className="text-xs text-muted-foreground">{bus.driver.experience} experience</p>
          </div>
          <Button
            onClick={() => onContactDriver(bus.driver)}
            variant="outline"
            size="sm"
          >
            <Phone className="w-4 h-4 mr-1" />
            Contact
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default BusDetailsCard;
