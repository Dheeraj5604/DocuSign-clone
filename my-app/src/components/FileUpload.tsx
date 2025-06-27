import { useState, useCallback } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { Button } from '../components/ui/button';


interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onRemoveFile: () => void;
}

const FileUpload = ({ onFileSelect, selectedFile, onRemoveFile }: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find(file => file.type === 'application/pdf');
    
    if (pdfFile) {
      onFileSelect(pdfFile);
    }
  }, [onFileSelect]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
    }
  };

  if (selectedFile) {
    return (
      <div className="cosmic-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-starlight-400 to-starlight-500 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{selectedFile.name}</h3>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemoveFile}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="cosmic-card p-8">
      <div
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
          isDragOver
            ? 'border-cosmos-400 bg-cosmos-400/10'
            : 'border-border hover:border-cosmos-400/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-gradient-to-r from-cosmos-500 to-accent rounded-full animate-float">
            <Upload className="w-12 h-12 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Upload Your PDF Document
            </h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop your PDF file here, or click to browse
            </p>
          </div>
          <label className="cosmic-button cursor-pointer">
            Choose PDF File
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileInput}
              className="hidden"
            />
          </label>
          <p className="text-xs text-muted-foreground">
            Maximum file size: 10MB. Only PDF files are supported.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
export {};