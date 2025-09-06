import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Route, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import routesData from '@/data/routes.json';

interface RoutesCarouselProps {
  onTrackRoute: (routeId: string) => void;
}

const RoutesCarousel = ({ onTrackRoute }: RoutesCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === routesData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? routesData.length - 1 : prevIndex - 1
    );
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'on time': return 'success';
      case 'delayed': return 'warning';
      default: return 'muted';
    }
  };

  return (
    <div className="glass-card">
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Popular Routes</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevSlide}
              className="w-8 h-8 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextSlide}
              className="w-8 h-8 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {routesData.map((route, index) => (
              <motion.div
                key={route.id}
                className="w-full flex-shrink-0 px-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="glass border border-card-border rounded-2xl p-6 hover:bg-muted/10 transition-colors">
                  {/* Route Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {route.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Route className="w-4 h-4" />
                          <span>{route.distance}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{route.averageTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full bg-${getStatusColor(route.status)}/20 border border-${getStatusColor(route.status)}/30`}>
                      <span className={`text-xs font-medium text-${getStatusColor(route.status)}`}>
                        {route.status}
                      </span>
                    </div>
                  </div>

                  {/* Bus Numbers */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Available buses:</span>
                      {route.busNumbers.map((busNumber, busIndex) => (
                        <span
                          key={busIndex}
                          className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded-lg"
                        >
                          {busNumber}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Frequency & Popularity */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Frequency: </span>
                      <span className="font-medium text-foreground">{route.frequency}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-muted rounded-full h-2 w-20">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${route.popularity}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-2 bg-gradient-to-r from-secondary to-primary rounded-full"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {route.popularity}%
                      </span>
                    </div>
                  </div>

                  {/* Track Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => onTrackRoute(route.id)}
                      className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                    >
                      Track This Route
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 mt-6">
          {routesData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex 
                  ? 'bg-primary' 
                  : 'bg-muted hover:bg-muted-foreground'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoutesCarousel;