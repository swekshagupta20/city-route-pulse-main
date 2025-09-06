import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Users, Fuel, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BusDetailsCard from '@/components/BusDetailsCard';
import ProgressThermometer from '@/components/ProgressThermometer';
import DriverContactModal from '@/components/DriverContactModal';
import { useToast } from '@/hooks/use-toast';
import busesData from '@/data/buses.json';

const BusDetails = () => {
  const { busId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  
  const bus = busesData.find(b => b.id === busId);

  useEffect(() => {
    if (!bus) {
      toast({
        title: "Bus Not Found",
        description: "The requested bus could not be found.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [bus, navigate, toast]);

  if (!bus) {
    return null;
  }

  const additionalInfo = {
    capacity: 45,
    currentOccupancy: 32,
    fuelLevel: 78,
    lastMaintenance: "2024-01-10",
    nextMaintenance: "2024-02-10"
  };

  const handleContactDriver = (driver: any) => {
    setSelectedDriver(driver);
  };

  return (
    <div className="min-h-screen bg-background pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-4 mb-8"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {bus.busNumber} - {bus.busName}
            </h1>
            <p className="text-muted-foreground">
              {bus.route.source} → {bus.route.destination}
            </p>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Progress & Additional Info */}
          <div className="lg:col-span-1 space-y-8">
            <ProgressThermometer selectedBus={bus} />
            
            {/* Additional Bus Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card"
            >
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-6">Bus Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 glass border border-card-border rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="font-medium text-foreground">Occupancy</span>
                    </div>
                    <span className="text-muted-foreground">
                      {additionalInfo.currentOccupancy}/{additionalInfo.capacity}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 glass border border-card-border rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Fuel className="w-5 h-5 text-secondary" />
                      <span className="font-medium text-foreground">Fuel Level</span>
                    </div>
                    <span className="text-muted-foreground">{additionalInfo.fuelLevel}%</span>
                  </div>

                  <div className="flex items-center justify-between p-3 glass border border-card-border rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Wrench className="w-5 h-5 text-warning" />
                      <span className="font-medium text-foreground">Last Service</span>
                    </div>
                    <span className="text-muted-foreground">{additionalInfo.lastMaintenance}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 glass border border-card-border rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-accent" />
                      <span className="font-medium text-foreground">Next Service</span>
                    </div>
                    <span className="text-muted-foreground">{additionalInfo.nextMaintenance}</span>
                  </div>
                </div>

                {/* Occupancy Progress */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-foreground">Current Occupancy</span>
                    <span className="text-muted-foreground">
                      {Math.round((additionalInfo.currentOccupancy / additionalInfo.capacity) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(additionalInfo.currentOccupancy / additionalInfo.capacity) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-3 bg-gradient-to-r from-success to-warning rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Bus Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <BusDetailsCard
              bus={bus}
              onContactDriver={handleContactDriver}
            />

            {/* Real-time Updates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 glass-card"
            >
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-6">Live Updates</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 glass border border-card-border rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 animate-pulse"></div>
                    <div>
                      <p className="font-medium text-foreground">Now arriving at Mall Road Junction</p>
                      <p className="text-sm text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 glass border border-card-border rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-success mt-2"></div>
                    <div>
                      <p className="font-medium text-foreground">Departed from Sector 15 Stop</p>
                      <p className="text-sm text-muted-foreground">8 minutes ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 glass border border-card-border rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-warning mt-2"></div>
                    <div>
                      <p className="font-medium text-foreground">Minor delay due to traffic congestion</p>
                      <p className="text-sm text-muted-foreground">15 minutes ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Driver Contact Modal */}
      {selectedDriver && (
        <DriverContactModal
          driver={selectedDriver}
          onClose={() => setSelectedDriver(null)}
        />
      )}
    </div>
  );
};

export default BusDetails;