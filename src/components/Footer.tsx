import { motion } from 'framer-motion';
import { MapPin, Heart, Shield, HelpCircle, FileText, Mail } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    {
      title: 'About',
      links: [
        { name: 'About Us', href: '#', icon: Heart },
        { name: 'Our Mission', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Press Kit', href: '#' }
      ]
    },
    {
      title: 'Support', 
      links: [
        { name: 'Help Center', href: '#', icon: HelpCircle },
        { name: 'Safety Guidelines', href: '#', icon: Shield },
        { name: 'Contact Us', href: '#', icon: Mail },
        { name: 'Report Issue', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', href: '#', icon: FileText },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Data Protection', href: '#' },
        { name: 'Accessibility', href: '#' }
      ]
    }
  ];

  return (
    <footer className="glass-card border-t border-card-border mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">BusTracker</h3>
                <p className="text-xs text-muted-foreground">Live City Transit</p>
              </div>
            </motion.div>
            
            <p className="text-muted-foreground text-sm leading-relaxed">
              Making public transportation more reliable and accessible for everyone. 
              Track your bus in real-time and travel with confidence.
            </p>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className="text-muted-foreground">Serving </span>
                <span className="font-semibold text-primary">250+ Routes</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">across </span>
                <span className="font-semibold text-secondary">5 Cities</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="font-semibold text-foreground">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 4 }}
                      className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.icon && <link.icon className="w-4 h-4" />}
                      <span>{link.name}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-card-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              <p>© 2024 BusTracker. All rights reserved.</p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-danger fill-current" />
              <span>for better commuting</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="px-3 py-1 glass border border-card-border rounded-full">
                <span className="text-xs text-muted-foreground">Version 1.0.0</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                <span className="text-xs text-muted-foreground">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;