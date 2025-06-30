import { useRef, useState, useEffect } from 'react';
import { Button } from './ui/button';
import { RotateCcw, Check } from 'lucide-react';
import { Signature } from './SignatureOptions';

interface DrawSignatureProps {
  onSignatureCreate: (signature: Signature) => void;
}

const DrawSignature = ({ onSignatureCreate }: DrawSignatureProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas background
    ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set drawing properties
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasSignature) return;

    const dataURL = canvas.toDataURL('image/png');
    onSignatureCreate({
      type: 'draw',
      data: dataURL,
      width: canvas.width,
      height: canvas.height,
    });
  };

  return (
    <div className="space-y-4">
      <div className="border border-border rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={600}
          height={200}
          className="w-full cursor-crosshair bg-gradient-to-r from-slate-800 to-slate-700"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={clearCanvas}
          className="flex items-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Clear</span>
        </Button>
        
        <Button
          onClick={saveSignature}
          disabled={!hasSignature}
          className="cosmic-button flex items-center space-x-2"
        >
          <Check className="w-4 h-4" />
          <span>Use Signature</span>
        </Button>
      </div>
      
      <p className="text-sm text-muted-foreground text-center">
        Draw your signature using your mouse or touch device
      </p>
    </div>
  );
};

export default DrawSignature;
export {};