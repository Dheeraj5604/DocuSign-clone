import { useState } from 'react';
import { Button } from '../components/ui/button';
// Try this if the file is named 'Input.tsx' (adjust the casing as per your project)

import { Check } from 'lucide-react';
import { Signature } from '../components/SignatureOptions';
import { Input } from '../components/ui/input';

interface TypeSignatureProps {
  onSignatureCreate: (signature: Signature) => void;
}

const TypeSignature = ({ onSignatureCreate }: TypeSignatureProps) => {
  const [text, setText] = useState('');
  const [selectedFont, setSelectedFont] = useState('signature');

  const fonts = [
    { id: 'signature', name: 'Signature Style', style: 'font-serif italic' },
    { id: 'elegant', name: 'Elegant Script', style: 'font-mono' },
    { id: 'modern', name: 'Modern Sans', style: 'font-sans' },
    { id: 'classic', name: 'Classic Serif', style: 'font-serif' },
  ];

  const createSignature = () => {
    if (!text.trim()) return;

    // Create a canvas to generate the signature image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 100;

    // Set background
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text properties
    ctx.fillStyle = '#e2e8f0';
    ctx.font = selectedFont === 'signature' ? '36px serif' : 
               selectedFont === 'elegant' ? '32px monospace' :
               selectedFont === 'modern' ? '30px sans-serif' : '34px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Add italic style for signature
    if (selectedFont === 'signature') {
      ctx.font = 'italic 36px serif';
    }

    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const dataURL = canvas.toDataURL('image/png');
    onSignatureCreate({
      type: 'type',
      data: dataURL,
      width: canvas.width,
      height: canvas.height,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Enter your full name
        </label>
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="John Smith"
          className="cosmic-input text-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Choose font style
        </label>
        <div className="grid grid-cols-2 gap-3">
          {fonts.map((font) => (
            <button
              key={font.id}
              onClick={() => setSelectedFont(font.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedFont === font.id
                  ? 'border-cosmos-500 bg-cosmos-500/10'
                  : 'border-border hover:border-cosmos-400/50'
              }`}
            >
              <div className={`text-lg ${font.style}`}>
                {text || 'Your Name'}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {font.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {text && (
        <div className="cosmic-card p-4 bg-gradient-to-r from-slate-800 to-slate-700">
          <p className="text-sm text-muted-foreground mb-2">Preview:</p>
          <div className={`text-2xl text-center text-slate-200 ${
            selectedFont === 'signature' ? 'font-serif italic' :
            selectedFont === 'elegant' ? 'font-mono' :
            selectedFont === 'modern' ? 'font-sans' : 'font-serif'
          }`}>
            {text}
          </div>
        </div>
      )}

      <Button
        onClick={createSignature}
        disabled={!text.trim()}
        className="cosmic-button w-full flex items-center justify-center space-x-2"
      >
        <Check className="w-4 h-4" />
        <span>Create Signature</span>
      </Button>
    </div>
  );
};

export default TypeSignature;
export {};
