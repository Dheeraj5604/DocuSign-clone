import { useState } from 'react';
import { Button } from './ui/button'; 
import { Download, Send, Plus } from 'lucide-react';
import { Signature } from './SignatureOptions';

interface PlacedSignature extends Signature {
  id: string;
  x: number;
  y: number;
  scale: number;
}

interface DocumentViewerProps {
  file: File;
  signatures: Signature[];
  onAddSignature: () => void;
}

const DocumentViewer = ({ file, signatures, onAddSignature }: DocumentViewerProps) => {
  const [placedSignatures, setPlacedSignatures] = useState<PlacedSignature[]>([]);
  const [selectedSignature, setSelectedSignature] = useState<Signature | null>(null);

  const handleDocumentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedSignature) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newPlacedSignature: PlacedSignature = {
      ...selectedSignature,
      id: Date.now().toString(),
      x,
      y,
      scale: 1,
    };

    setPlacedSignatures([...placedSignatures, newPlacedSignature]);
    setSelectedSignature(null);
  };

  const removeSignature = (id: string) => {
    setPlacedSignatures(placedSignatures.filter(sig => sig.id !== id));
  };

  const downloadDocument = () => {
    // In a real app, you would merge the signatures with the PDF
    console.log('Downloading document with signatures:', placedSignatures);
    alert('Document would be downloaded with signatures in a real implementation');
  };

  const sendDocument = () => {
    // In a real app, you would send the document via email
    console.log('Sending document with signatures:', placedSignatures);
    alert('Document would be sent via email in a real implementation');
  };

  return (
    <div className="space-y-6">
      <div className="cosmic-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-foreground">Document Preview</h3>
          <div className="flex space-x-2">
            <Button
              onClick={onAddSignature}
              className="cosmic-button flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Signature</span>
            </Button>
          </div>
        </div>

        {/* Available Signatures */}
        {signatures.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">Click a signature, then click on the document to place it:</p>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {signatures.map((sig, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSignature(sig)}
                  className={`flex-shrink-0 p-2 border-2 rounded-lg transition-all ${
                    selectedSignature === sig
                      ? 'border-cosmos-500 bg-cosmos-500/10'
                      : 'border-border hover:border-cosmos-400/50'
                  }`}
                >
                  <img
                    src={sig.data}
                    alt="Signature"
                    className="h-8 object-contain"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Document Area */}
        <div
          className="relative bg-white rounded-lg border border-border min-h-[600px] cursor-crosshair overflow-hidden"
          onClick={handleDocumentClick}
        >
          {/* PDF Preview Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-500">
              <div className="text-6xl mb-4">📄</div>
              <p className="text-lg font-medium">{file.name}</p>
              <p className="text-sm">PDF Preview</p>
              <p className="text-xs mt-2">
                In a real app, PDF.js would render the document here
              </p>
            </div>
          </div>

          {/* Placed Signatures */}
          {placedSignatures.map((sig) => (
            <div
              key={sig.id}
              className="absolute group cursor-move"
              style={{
                left: sig.x,
                top: sig.y,
                transform: `scale(${sig.scale})`,
                transformOrigin: 'top left',
              }}
            >
              <img
                src={sig.data}
                alt="Placed signature"
                className="max-w-[150px] max-h-[50px] object-contain"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeSignature(sig.id);
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}

          {selectedSignature && (
            <div className="absolute top-4 left-4 bg-cosmos-500 text-white px-3 py-1 rounded-lg text-sm">
              Click to place signature
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {placedSignatures.length > 0 && (
        <div className="cosmic-card p-6">
          <div className="flex space-x-4">
            <Button
              onClick={downloadDocument}
              className="cosmic-button flex items-center space-x-2 flex-1"
            >
              <Download className="w-4 h-4" />
              <span>Download Signed Document</span>
            </Button>
            <Button
              onClick={sendDocument}
              className="nebula-button flex items-center space-x-2 flex-1"
            >
              <Send className="w-4 h-4" />
              <span>Send via Email</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentViewer;
