
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFileAccepted: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileAccepted }) => {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        if (
          file.type === "application/pdf" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          file.type === "application/msword"
        ) {
          onFileAccepted(file);
        } else {
          toast({
            title: "Invalid file type",
            description: "Please upload a PDF or Word document",
            variant: "destructive",
          });
        }
      }
    },
    [onFileAccepted, toast]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
        ".docx",
      ],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative cursor-pointer transition-all duration-300 ease-in-out
        ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-gray-200 hover:border-primary/50"
        }
        rounded-lg border-2 border-dashed p-12 text-center`}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
    >
      <input {...getInputProps()} />
      <div className="animate-fade-up space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Upload className="h-6 w-6 text-primary" />
        </div>
        <div className="space-y-2">
          <p className="text-xl font-medium text-gray-700">
            Upload your resume
          </p>
          <p className="text-sm text-gray-500">
            Drag and drop your resume here, or click to browse
          </p>
        </div>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <FileText className="h-4 w-4" />
          <span>PDF, DOC, or DOCX up to 10MB</span>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
