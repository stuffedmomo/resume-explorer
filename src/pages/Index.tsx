
import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [resumeText, setResumeText] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      // In a real implementation, you would send this to your backend
      // For now, we'll just simulate processing
      setTimeout(() => {
        setResumeText("Sample extracted text from resume...");
        toast({
          title: "Resume processed successfully",
          description: "Your resume has been analyzed and is ready for review.",
        });
        setIsProcessing(false);
      }, 2000);
    } catch (error) {
      toast({
        title: "Error processing resume",
        description: "There was an error processing your resume. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Resume Explorer
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Upload a resume to get started with AI-powered analysis
          </p>
        </div>

        <Card className="overflow-hidden p-6">
          {!resumeText ? (
            <FileUpload onFileAccepted={handleFileUpload} />
          ) : (
            <div className="animate-fade-in space-y-4">
              <h2 className="text-xl font-semibold">Extracted Information</h2>
              <p className="text-gray-700">{resumeText}</p>
              <Button
                onClick={() => setResumeText(null)}
                variant="outline"
                className="mt-4"
              >
                Upload Another Resume
              </Button>
            </div>
          )}
        </Card>

        {isProcessing && (
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span className="text-sm text-gray-500">Processing resume...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
