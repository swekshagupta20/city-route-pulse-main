import { motion } from 'framer-motion';
import { Phone, MessageCircle, X, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Driver {
  name: string;
  phone: string;
  experience: string;
}

interface DriverContactModalProps {
  driver: Driver;
  onClose: () => void;
}

const DriverContactModal = ({ driver, onClose }: DriverContactModalProps) => {
  const handleCall = () => {
    window.open(`tel:${driver.phone}`, '_self');
  };

  const handleSMS = () => {
    window.open(`sms:${driver.phone}`, '_self');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // TOP-ALIGN the modal for dashboard consistent layout
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-start justify-center pt-24 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md glass-card border border-card-border"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-card-border">
          <h2 className="text-xl font-bold text-foreground">Contact Driver</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Driver Info */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-foreground">
                {driver.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">{driver.name}</h3>
            <p className="text-muted-foreground mb-4">{driver.experience} of experience</p>
            {/* Rating */}
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className="w-4 h-4 fill-warning text-warning" 
                />
              ))}
              <span className="text-sm text-muted-foreground ml-2">4.8/5.0</span>
            </div>
          </div>

          {/* Contact Options */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCall}
              className="w-full flex items-center space-x-4 p-4 glass border border-card-border rounded-2xl hover:bg-success/10 transition-colors"
            >
              <div className="p-3 rounded-xl bg-success/20">
                <Phone className="w-6 h-6 text-success" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-foreground">Call Driver</p>
                <p className="text-sm text-muted-foreground">{driver.phone}</p>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSMS}
              className="w-full flex items-center space-x-4 p-4 glass border border-card-border rounded-2xl hover:bg-primary/10 transition-colors"
            >
              <div className="p-3 rounded-xl bg-primary/20">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-foreground">Send Message</p>
                <p className="text-sm text-muted-foreground">Quick SMS to driver</p>
              </div>
            </motion.button>
          </div>

          {/* Quick Messages */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Quick Messages</h4>
            <div className="space-y-2">
              {[
                "Where is the bus currently?",
                "How long until next stop?",
                "Is the bus on schedule?"
              ].map((message, index) => (
                <button
                  key={index}
                  onClick={() => {
                    window.open(`sms:${driver.phone}?body=${encodeURIComponent(message)}`, '_self');
                  }}
                  className="w-full text-left p-3 glass border border-card-border rounded-xl hover:bg-muted/20 transition-colors"
                >
                  <p className="text-sm text-foreground">{message}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Current Location Info */}
          <div className="p-4 glass border border-card-border rounded-xl">
            <div className="flex items-center space-x-3 mb-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">Current Location</span>
            </div>
            <p className="text-sm text-muted-foreground ml-8">
              Near Mall Road Junction - Bus is on schedule
            </p>
          </div>

          {/* Note */}
          <div className="p-3 bg-muted/20 rounded-xl">
            <p className="text-xs text-muted-foreground text-center">
              Please contact the driver only for urgent matters. For general inquiries, 
              use the app's tracking features.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DriverContactModal;
