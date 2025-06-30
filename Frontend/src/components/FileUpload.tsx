import { useState, useCallback } from 'react';
import { Upload, FileText, X, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import api from '../lib/api';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onRemoveFile: () => void;
}

const FileUpload = ({ onFileSelect, selectedFile, onRemoveFile }: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      const pdfFile = files.find((file) => file.type === 'application/pdf');

      if (pdfFile) {
        await handleFileUpload(pdfFile);
      }
    },
    [onFileSelect]
  );

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      await handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('File uploaded successfully:', response.data);
      onFileSelect(file); // Notify parent component with the selected file
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Failed to upload the file. Please try again.');
    } finally {
      setUploading(false);
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
            {uploading ? (
              <Loader2 className="w-12 h-12 text-white animate-spin" />
            ) : (
              <Upload className="w-12 h-12 text-white" />
            )}
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
              disabled={uploading}
            />
          </label>
          <p className="text-xs text-muted-foreground">
            Maximum file size: 10MB. Only PDF files are supported.
          </p>
          {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
export {};