import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  autoClose?: boolean;
}

interface NotificationToastProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

const NotificationToast = ({ notifications, onDismiss }: NotificationToastProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5" />;
      case 'warning': return <AlertCircle className="w-5 h-5" />;
      case 'error': return <AlertCircle className="w-5 h-5" />;
      case 'info': return <Info className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-success/20',
          border: 'border-success/30',
          text: 'text-success',
          icon: 'text-success'
        };
      case 'warning':
        return {
          bg: 'bg-warning/20',
          border: 'border-warning/30',
          text: 'text-warning',
          icon: 'text-warning'
        };
      case 'error':
        return {
          bg: 'bg-danger/20',
          border: 'border-danger/30',
          text: 'text-danger',
          icon: 'text-danger'
        };
      case 'info':
        return {
          bg: 'bg-primary/20',
          border: 'border-primary/30',
          text: 'text-primary',
          icon: 'text-primary'
        };
      default:
        return {
          bg: 'bg-muted/20',
          border: 'border-muted/30',
          text: 'text-muted-foreground',
          icon: 'text-muted-foreground'
        };
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-3 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => {
          const colors = getColors(notification.type);
          
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`glass border ${colors.border} rounded-2xl p-4 shadow-lg`}
            >
              <div className="flex items-start space-x-3">
                <div className={`${colors.icon} mt-0.5`}>
                  {getIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-semibold ${colors.text} text-sm`}>
                      {notification.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(notification.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {notification.message}
                  </p>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDismiss(notification.id)}
                  className="h-6 w-6 p-0 hover:bg-muted/50"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
              
              {/* Progress bar for auto-close */}
              {notification.autoClose && (
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 5, ease: "linear" }}
                  className={`mt-3 h-1 ${colors.bg} rounded-full`}
                  onAnimationComplete={() => onDismiss(notification.id)}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default NotificationToast;