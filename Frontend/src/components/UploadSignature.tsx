import { useState, useCallback } from 'react';
import { Button } from './ui/button';
import { Upload, Check, X } from 'lucide-react';
import { Signature } from './SignatureOptions';

interface UploadSignatureProps {
  onSignatureCreate: (signature: Signature) => void;
}

const UploadSignature = ({ onSignatureCreate }: UploadSignatureProps) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
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
    const imageFile = files.find(file => file.type.startsWith('image/'));

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setUploadedImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(imageFile);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setUploadedImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
  };

  const useSignature = () => {
    if (!uploadedImage) return;

    onSignatureCreate({
      type: 'upload',
      data: uploadedImage,
    });
  };

  if (uploadedImage) {
    return (
      <div className="space-y-4">
        <div className="cosmic-card p-4 bg-gradient-to-r from-slate-800 to-slate-700">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Preview:</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeImage}
              className="text-destructive hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex justify-center">
            <img
              src={uploadedImage}
              alt="Signature preview"
              className="max-h-24 object-contain"
            />
          </div>
        </div>

        <Button
          onClick={useSignature}
          className="cosmic-button w-full flex items-center justify-center space-x-2"
        >
          <Check className="w-4 h-4" />
          <span>Use This Signature</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
          isDragOver
            ? 'border-cosmos-400 bg-cosmos-400/10'
            : 'border-border hover:border-cosmos-400/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="p-3 bg-gradient-to-r from-cosmos-500 to-accent rounded-full">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">
              Upload Signature Image
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop an image, or click to browse
            </p>
          </div>
          <label className="cosmic-button cursor-pointer">
            Choose Image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
        <p className="text-xs text-amber-200">
          <strong>Tip:</strong> For best results, use a high-contrast image with your signature on a white or transparent background.
        </p>
      </div>
    </div>
  );
};

export default UploadSignature;
