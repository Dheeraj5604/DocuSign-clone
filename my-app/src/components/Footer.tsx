import { Heart, Star, Rocket } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="cosmic-card p-8 mt-12">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-muted-foreground">Made with</span>
          <Heart className="w-4 h-4 text-nebula-500 animate-pulse" />
          <span className="text-muted-foreground">in the</span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-starlight-400 animate-twinkle" />
            <span className="bg-gradient-to-r from-cosmos-300 to-nebula-300 bg-clip-text text-transparent font-semibold">
              Universe
            </span>
            <Rocket className="w-4 h-4 text-cosmos-400 animate-float" />
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-cosmos-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-cosmos-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-cosmos-400 transition-colors">Support</a>
          <a href="#" className="hover:text-cosmos-400 transition-colors">Contact</a>
        </div>
        
        <p className="text-xs text-muted-foreground">
          © 2024 DocSign Universe. All rights reserved across the galaxy.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
export {};