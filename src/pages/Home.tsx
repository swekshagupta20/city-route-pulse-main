import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ProgressThermometer from '@/components/ProgressThermometer';
import BusDetailsCard from '@/components/BusDetailsCard';
import MapPlaceholder from '@/components/MapPlaceholder';
import RoutesCarousel from '@/components/RoutesCarousel';
import NotificationToast from '@/components/NotificationToast';
import DriverContactModal from '@/components/DriverContactModal';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import busesData from '@/data/buses.json';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  autoClose?: boolean;
}

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedBus, setSelectedBus] = useState<any>(busesData[0]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [refreshTimer, setRefreshTimer] = useState(180); // 3 minutes
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const { toast } = useToast();

  // Auto-refresh timer
  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshTimer((prev) => {
        if (prev <= 1) {
          // Refresh data
          addNotification({
            type: 'info',
            title: 'Data Refreshed',
            message: 'Bus tracking information has been updated',
            autoClose: true
          });
          return 180;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Sample notifications
  useEffect(() => {
    const sampleNotifications = [
      {
        type: 'warning' as const,
        title: 'Service Update',
        message: 'Bus 15B is running 8 minutes behind schedule due to traffic',
        autoClose: true
      },
      {
        type: 'success' as const,
        title: 'Route Active',
        message: 'Bus 42A is now being tracked. ETA: 15 minutes',
        autoClose: true
      }
    ];

    sampleNotifications.forEach((notif, index) => {
      setTimeout(() => addNotification(notif), index * 2000);
    });
  }, []);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    };
    
    setNotifications(prev => [newNotification, ...prev].slice(0, 5));
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleSearch = (query: string) => {
    // Find matching bus
    const matchingBus = busesData.find(bus => 
      bus.busNumber.toLowerCase().includes(query.toLowerCase()) ||
      bus.busName.toLowerCase().includes(query.toLowerCase()) ||
      bus.route.source.toLowerCase().includes(query.toLowerCase()) ||
      bus.route.destination.toLowerCase().includes(query.toLowerCase())
    );

    if (matchingBus) {
      setSelectedBus(matchingBus);
      toast({
        title: "Bus Found",
        description: `Now tracking ${matchingBus.busNumber} - ${matchingBus.busName}`,
      });
    } else {
      toast({
        title: "No Results",
        description: "No buses found matching your search. Try a different query.",
        variant: "destructive"
      });
    }
  };

  const handleContactDriver = (driver?: any) => {
    if (driver) {
      setSelectedDriver(driver);
    } else if (selectedBus) {
      setSelectedDriver(selectedBus.driver);
    }
  };

  const handleTrackRoute = (routeId: string) => {
    // Find first bus for this route
    const routeBus = busesData.find(bus => 
      bus.route.source.includes('Sector 10') || 
      bus.route.destination.includes('Central Station')
    );
    
    if (routeBus) {
      setSelectedBus(routeBus);
      toast({
        title: "Route Tracked",
        description: `Now tracking ${routeBus.busNumber} on this route`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        onSearch={handleSearch}
        onContactDriver={() => handleContactDriver()}
      />

      {/* Main Content */}
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Live Tracking Map - Moved to top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 min-h-[400px]"
          >
            <MapPlaceholder 
              selectedBus={selectedBus}
              refreshTimer={refreshTimer}
            />
          </motion.div>

          {/* Bus Details Card */}
          {selectedBus && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <BusDetailsCard
                bus={selectedBus}
                onContactDriver={handleContactDriver}
              />
            </motion.div>
          )}

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Vertical Progress Thermometer */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              <ProgressThermometer selectedBus={selectedBus} />
            </motion.div>

            {/* Additional Content Area */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="glass-card h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-muted-foreground">Additional Features</h3>
                  <p className="text-muted-foreground mt-2">Reserved for future enhancements</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Routes Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <RoutesCarousel onTrackRoute={handleTrackRoute} />
          </motion.div>
        </div>
      </main>

      <Footer />

      {/* Notifications */}
      <NotificationToast
        notifications={notifications}
        onDismiss={dismissNotification}
      />

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

export default Home;