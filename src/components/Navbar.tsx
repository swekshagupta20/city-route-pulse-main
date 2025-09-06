import { useState } from 'react';
import { Search, Phone, History, AlertTriangle, User, Moon, Sun, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import SearchHistory from './SearchHistory';
import EmergencyPanel from './EmergencyPanel';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onSearch: (query: string) => void;
  onContactDriver: () => void;
}

const Navbar = ({ darkMode, toggleDarkMode, onSearch, onContactDriver }: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);

  const suggestions = [
    '42A City Express',
    '15B Metro Link', 
    '78C Green Line',
    'Sector 10 Hub',
    'Central Station',
    'Airport Terminal',
    'University Campus'
  ];

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.length > 0) {
      const filtered = suggestions.filter(s => 
        s.toLowerCase().includes(value.toLowerCase())
      );
      setSearchSuggestions(filtered.slice(0, 5));
    } else {
      setSearchSuggestions([]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setSearchQuery('');
      setSearchSuggestions([]);
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-card-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">BusTracker</h1>
                <p className="text-xs text-muted-foreground">Live City Transit</p>
              </div>
            </motion.div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-4 relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Input
                  type="text"
                  placeholder="Search buses, routes, or stops..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 pr-12 glass bg-card/50 border-card-border"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHistory(!showHistory)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                >
                  <History className="w-4 h-4" />
                </Button>
              </form>

              {/* Search Suggestions */}
              <AnimatePresence>
                {searchSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 glass-card border border-card-border z-50"
                  >
                    {searchSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchQuery(suggestion);
                          onSearch(suggestion);
                          setSearchSuggestions([]);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-muted/50 transition-colors first:rounded-t-xl last:rounded-b-xl"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost" 
                size="sm"
                onClick={onContactDriver}
                className="hidden sm:flex"
              >
                <Phone className="w-4 h-4 mr-2" />
                Contact Driver
              </Button>

              <Button
                variant="destructive"
                size="sm" 
                onClick={() => setShowEmergency(true)}
                className="bg-danger hover:bg-danger/90"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Emergency</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              <Button variant="ghost" size="sm">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Search History */}
      <AnimatePresence>
        {showHistory && (
          <SearchHistory 
            onClose={() => setShowHistory(false)}
            onSelectHistory={(query) => {
              setSearchQuery(query);
              onSearch(query);
              setShowHistory(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Emergency Panel */}
      <AnimatePresence>
        {showEmergency && (
          <EmergencyPanel onClose={() => setShowEmergency(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;