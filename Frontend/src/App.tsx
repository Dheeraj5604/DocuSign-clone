import { useState } from "react";
import Header from "./components/Header";
import FileUpload from "./components/FileUpload";
import SignatureOptions from "./components/SignatureOptions";
import DocumentViewer from "./components/DocumentViewer";
import FeatureList from "./components/FeatureList";
import Footer from "./components/Footer";
import { Signature } from "./components/SignatureOptions";
import api from "./lib/api"; // Axios instance for API calls

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Upload file to the backend
  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded:", response.data);
    } catch (err: any) {
      console.error("Upload failed:", err);
      setError("Failed to upload file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);

    // Upload the file to the backend
    await handleFileUpload(file);

    // Fetch existing signatures for the file
    fetchSignatures();
  };

  // Fetch signatures from the backend
  const fetchSignatures = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/signatures");
      setSignatures(response.data);
    } catch (err: any) {
      console.error("Failed to fetch signatures:", err);
      setError("Could not fetch signatures. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Save a new signature to the backend
  const handleSignatureCreate = async (signature: Signature) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/signatures", signature);
      setSignatures([...signatures, response.data]);
      setShowSignatureModal(false);
    } catch (err: any) {
      console.error("Failed to save signature:", err);
      setError("Could not save the signature. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setSignatures([]);
  };

  const handleAddSignature = () => {
    setShowSignatureModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-yellow-300 flex flex-col">
      <div className="container mx-auto px-6 py-8 max-w-5xl">
        <Header />

        <main className="mt-12 flex flex-col items-center justify-center space-y-8">
          {!selectedFile ? (
            <>
              <FileUpload
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
                onRemoveFile={handleRemoveFile}
              />
              <div className="mt-12 w-full text-center">
                <FeatureList />
              </div>
            </>
          ) : (
            <div className="space-y-6 w-full">
              <FileUpload
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
                onRemoveFile={handleRemoveFile}
              />
              <DocumentViewer
                file={selectedFile}
                signatures={signatures}
                onAddSignature={handleAddSignature}
              />
            </div>
          )}
        </main>

        {showSignatureModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
              <SignatureOptions
                onSignatureCreate={handleSignatureCreate}
                onClose={() => setShowSignatureModal(false)}
              />
            </div>
          </div>
        )}

        <Footer />
      </div>

      {loading && <p className="text-center text-sm mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 text-sm mt-4">{error}</p>}
    </div>
  );
};

export default Index;
export {};