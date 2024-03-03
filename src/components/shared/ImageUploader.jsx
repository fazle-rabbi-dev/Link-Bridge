import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { X, Image } from "lucide-react";
import { cn } from "@/lib/utils";

export const ImageUploader = ({ currentFile, setCurrentFile, previewUrl, setPreviewUrl, usedFor }) => {
  const [previewError, setPreviewError] = useState("");

  const onDrop = useCallback(acceptedFiles => {
    setCurrentFile(acceptedFiles[0]);

    const file = acceptedFiles[0];

    if (["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setPreviewError("");
    } else {
      setPreviewUrl("");
      setPreviewError("Only jpg,png & jpeg supported");
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className={
        cn(
          "w-28 h-28 rounded", 
          {
            "border-2 border-dotted": !previewUrl,
            "rounded-full": usedFor === "profile-pic",
            "w-full h-full": usedFor === "custom-bg"
          }
        )
      }
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {currentFile || previewUrl ? (
        <div className="h-full w-full">
          {!previewError && (
            <img className={`bg-cover h-full w-full ${usedFor !== "custom-bg" && "rounded-full"} `} src={previewUrl} alt="Preview image" />
          )}
          {previewError && <p className="text-sm p-2 text-center text-pink-600">{previewError}</p>}
        </div>
      ) : (
        <div className="w-full h-full p-4 flex flex-col justify-center items-center">
          <span>
            <Image size={40} />
          </span>
          <span className="mt-2 body-text">{usedFor === "custom-bg" ? "Custom Background" : "Picture"}</span>
        </div>
      )}
    </div>
  );
};
