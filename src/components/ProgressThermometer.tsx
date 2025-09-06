import { motion } from 'framer-motion';
import { MapPin, Clock, AlertCircle, CheckCircle } from 'lucide-react';

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
  currentLocation: {
    nearestStop: string;
  };
}

interface ProgressThermometerProps {
  selectedBus: Bus | null;
}

const ProgressThermometer = ({ selectedBus }: ProgressThermometerProps) => {
  if (!selectedBus) {
    return (
      <div className="glass-card h-full flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Select a bus to track its progress</p>
        </div>
      </div>
    );
  }

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
    <div className="glass-card h-full">
      <div className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Journey Progress</h2>

        {/* Bus Info */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {selectedBus.busNumber} - {selectedBus.busName}
              </h3>
              <p className="text-muted-foreground text-sm">
                {selectedBus.route.source} → {selectedBus.route.destination}
              </p>
            </div>
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full bg-${getStatusColor(selectedBus.currentStatus)}/20`}>
              <span className={`text-${getStatusColor(selectedBus.currentStatus)}`}>
                {getStatusIcon(selectedBus.currentStatus)}
              </span>
              <span className={`text-sm font-medium text-${getStatusColor(selectedBus.currentStatus)}`}>
                {selectedBus.currentStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Vertical Progress Thermometer */}
        <div className="relative">
          <div className="flex">
            {/* Progress Bar */}
            <div className="relative mr-6">
              <div className="w-4 h-96 bg-muted rounded-full relative overflow-hidden">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${selectedBus.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-${getStatusColor(selectedBus.currentStatus)} to-${getStatusColor(selectedBus.currentStatus)}/70 rounded-full`}
                />
              </div>
              
              {/* Progress Markers */}
              <div className="absolute -left-3 top-0">
                <div className={`w-10 h-10 rounded-full bg-${getStatusColor(selectedBus.currentStatus)} flex items-center justify-center shadow-lg`}>
                  <MapPin className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <motion.div
                initial={{ top: '100%' }}
                animate={{ top: `${100 - selectedBus.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute -left-3 transform -translate-y-1/2"
              >
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg animate-pulse-glow">
                  <div className="w-3 h-3 rounded-full bg-white" />
                </div>
              </motion.div>
              
              <div className="absolute -left-3 bottom-0">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shadow-lg">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Progress Info */}
            <div className="flex-1 space-y-8">
              {/* Source */}
              <div>
                <h4 className="font-semibold text-foreground">{selectedBus.route.source}</h4>
                <p className="text-sm text-muted-foreground">Starting point</p>
              </div>

              {/* Current Location */}
              <div className="mt-32">
                <h4 className="font-semibold text-primary">Current Location</h4>
                <p className="text-sm text-muted-foreground">{selectedBus.currentLocation.nearestStop}</p>
                <div className="mt-2 text-sm">
                  <span className="text-foreground font-medium">{selectedBus.progress}%</span>
                  <span className="text-muted-foreground"> completed</span>
                </div>
              </div>

              {/* Destination */}
              <div className="mt-auto">
                <h4 className="font-semibold text-foreground">{selectedBus.route.destination}</h4>
                <p className="text-sm text-muted-foreground">Final destination</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="glass border border-card-border rounded-xl p-4">
            <div className="text-2xl font-bold text-foreground">
              {selectedBus.distanceCovered.toFixed(1)} km
            </div>
            <div className="text-sm text-muted-foreground">Distance Covered</div>
          </div>
          
          <div className="glass border border-card-border rounded-xl p-4">
            <div className="text-2xl font-bold text-foreground">
              {selectedBus.estimatedTimeRemaining} min
            </div>
            <div className="text-sm text-muted-foreground">ETA</div>
          </div>
          
          <div className="glass border border-card-border rounded-xl p-4">
            <div className="text-2xl font-bold text-foreground">
              {selectedBus.totalDistance} km
            </div>
            <div className="text-sm text-muted-foreground">Total Distance</div>
          </div>
          
          <div className="glass border border-card-border rounded-xl p-4">
            <div className="text-2xl font-bold text-foreground">
              {selectedBus.eta}
            </div>
            <div className="text-sm text-muted-foreground">Arrival Time</div>
          </div>
        </div>

        {selectedBus.delayMinutes > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-warning/20 border border-warning/30 rounded-xl"
          >
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium text-warning">
                Delayed by {selectedBus.delayMinutes} minutes
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProgressThermometer;