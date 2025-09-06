import { motion } from 'framer-motion';
import { Clock, X, Bus, MapPin, Route } from 'lucide-react';
import { Button } from '@/components/ui/button';
import searchHistoryData from '@/data/searchHistory.json';

interface SearchHistoryProps {
  onClose: () => void;
  onSelectHistory: (query: string) => void;
}

const SearchHistory = ({ onClose, onSelectHistory }: SearchHistoryProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'bus': return <Bus className="w-4 h-4" />;
      case 'route': return <Route className="w-4 h-4" />;
      case 'stop': return <MapPin className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        onClick={(e) => e.stopPropagation()}
        className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-md mx-4"
      >
        <div className="glass-card border border-card-border">
          <div className="flex items-center justify-between p-4 border-b border-card-border">
            <h3 className="font-semibold text-foreground">Recent Searches</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="p-2">
            {searchHistoryData.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectHistory(item.query)}
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-left"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.query}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {item.type} • {formatTime(item.timestamp)}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="p-4 border-t border-card-border">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-muted-foreground"
            >
              Clear History
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchHistory;