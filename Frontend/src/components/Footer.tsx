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
        
        <div className="flex flex-col items-center space-y-4 mt-8 text-sm text-muted-foreground">
  <div className="flex flex-wrap justify-center space-x-6">
    <a
      href="/privacy-policy"
      className="hover:text-cosmos-400 transition-colors underline text-center"
    >
      Privacy Policy
    </a>
    <a
      href="/terms-of-service"
      className="hover:text-cosmos-400 transition-colors underline text-center"
    >
      Terms of Service
    </a>
    <a
      href="/support"
      className="hover:text-cosmos-400 transition-colors underline text-center"
    >
      Support
    </a>
    <a
      href="/contact"
      className="hover:text-cosmos-400 transition-colors underline text-center"
    >
      Contact
    </a>
  </div>
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