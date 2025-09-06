import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Phone, Shield, FileText, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface EmergencyPanelProps {
  onClose: () => void;
}

const EmergencyPanel = ({ onClose }: EmergencyPanelProps) => {
  const [reportForm, setReportForm] = useState({
    busNumber: '',
    route: '',
    location: '',
    description: ''
  });
  const [showReportForm, setShowReportForm] = useState(false);
  const { toast } = useToast();

  const emergencyContacts = [
    { name: 'Police', number: '100', icon: Shield },
    { name: 'Ambulance', number: '108', icon: Phone },
    { name: 'Women Helpline', number: '1091', icon: Shield },
    { name: 'Transit Authority', number: '1800-XXX-XXXX', icon: Phone }
  ];

  const handleSOS = () => {
    toast({
      title: "Emergency Alert Sent",
      description: "Your location and emergency signal have been sent to authorities.",
      variant: "destructive"
    });
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Report Submitted",
      description: "Your incident report has been sent to the transit authority.",
    });
    setReportForm({ busNumber: '', route: '', location: '', description: '' });
    setShowReportForm(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md glass-card border border-card-border max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-card-border">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-danger/20">
              <AlertTriangle className="w-6 h-6 text-danger" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Emergency</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* SOS Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleSOS}
              className="w-full h-16 bg-danger hover:bg-danger/90 text-danger-foreground font-bold text-lg rounded-2xl"
            >
              <AlertTriangle className="w-6 h-6 mr-3" />
              EMERGENCY SOS
            </Button>
          </motion.div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Emergency Contacts</h3>
            <div className="grid grid-cols-2 gap-3">
              {emergencyContacts.map((contact, index) => (
                <motion.a
                  key={index}
                  href={`tel:${contact.number}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass border border-card-border rounded-xl p-4 text-center space-y-2 hover:bg-muted/20 transition-colors"
                >
                  <contact.icon className="w-6 h-6 mx-auto text-primary" />
                  <p className="font-medium text-sm text-foreground">{contact.name}</p>
                  <p className="text-xs text-muted-foreground">{contact.number}</p>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Report Incident */}
          <div>
            <Button
              variant="outline"
              onClick={() => setShowReportForm(!showReportForm)}
              className="w-full"
            >
              <FileText className="w-4 h-4 mr-2" />
              Report Incident
            </Button>

            {showReportForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleReportSubmit}
                className="mt-4 space-y-4"
              >
                <Input
                  placeholder="Bus Number (e.g., 42A)"
                  value={reportForm.busNumber}
                  onChange={(e) => setReportForm({...reportForm, busNumber: e.target.value})}
                  className="glass bg-card/50"
                />
                <Input
                  placeholder="Route"
                  value={reportForm.route}
                  onChange={(e) => setReportForm({...reportForm, route: e.target.value})}
                  className="glass bg-card/50"
                />
                <Input
                  placeholder="Current Location"
                  value={reportForm.location}
                  onChange={(e) => setReportForm({...reportForm, location: e.target.value})}
                  className="glass bg-card/50"
                />
                <Textarea
                  placeholder="Describe the incident..."
                  value={reportForm.description}
                  onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
                  className="glass bg-card/50 min-h-[100px]"
                />
                <Button type="submit" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Report
                </Button>
              </motion.form>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EmergencyPanel;