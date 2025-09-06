import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Route, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import routesData from '@/data/routes.json';

interface RoutesCarouselProps {
  onTrackRoute: (routeId: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'on time': return 'success';
    case 'delayed': return 'warning';
    default: return 'muted';
  }
};

const CARDS_PER_PAGE = 3;

const RoutesCarousel = ({ onTrackRoute }: RoutesCarouselProps) => {
  const [startIndex, setStartIndex] = useState(0);

  const maxIndex = routesData.length - CARDS_PER_PAGE;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const visibleCards = routesData.slice(startIndex, startIndex + CARDS_PER_PAGE);

  return (
    <div className="glass-card">
      <div className="p-4 pb-2">
        {/* Header & Arrows */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Popular Routes</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrev}
              className="w-8 h-8 p-0"
              disabled={startIndex === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNext}
              className="w-8 h-8 p-0"
              disabled={startIndex === maxIndex}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Horizontal Card Row */}
        <div className="flex flex-row gap-4 justify-center items-stretch w-full">
          {visibleCards.map((route, index) => (
            <motion.div
              key={route.id}
              className="flex-1 min-w-0 glass border border-card-border rounded-2xl p-4 hover:bg-muted/10 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoutesCarousel;
