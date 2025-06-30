import { FileText, Pen, Upload } from 'lucide-react';

const Header = () => {
  return (
    <header className="cosmic-card p-6 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-cosmos-500 to-accent rounded-lg animate-cosmic-pulse">
            <Pen className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cosmos-300 to-nebula-300 bg-clip-text text-transparent">
              DocSign Universe
            </h1>
            <p className="text-muted-foreground">Professional Document Signing Platform</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <FileText className="w-4 h-4" />
            <span>Secure & Fast</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Upload className="w-4 h-4" />
            <span>Easy Upload</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
export {};