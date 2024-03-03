import { useState, useEffect } from "react";
import ColorPicker from "react-pick-color";
import { ImageUploader } from "@/components";
import { showToast } from "@/lib/utils";
import { useUpdateProfileDesign } from "@/lib/react-query";
import { useThemeStore } from "@/zustand-stores";

export const Background = () => {
  const [color, setColor] = useState("");
  const [currentFile, setCurrentFile] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const design = useThemeStore(state => state.design);
  const { mutateAsync: updateDesign, isPending: isUpdating } = useUpdateProfileDesign();
  
  // =====================================================================================================================
  // Update Background
  // =====================================================================================================================
  const updaeBackground = async () => {
    // Pass old image data publicid
    // The bellow data object goes to the backend
    const data = {
      file: currentFile,
      data: {
        background: {
          color,
          image: {
            url: "",
            publicId: ""
          }
        }
      }
    };

    if (!color && !currentFile) {
      return showToast("Please choose a background.", "error");
    }
    
    if (color) {
      delete data.file;
    }else{
      data.data.background.color = "";
    }

    const res = await updateDesign({ data, type: "background" });
    
    if (res?.status === "Success") {
      showToast("Background changed successfully.");
    } else {
      showToast(res.data?.message || "Something went wrong.Try to upload image less then 500kb.", "error", 2000);
    }
  };
  
  
  const changeColor = color => {
    setColor(color.hex);
    if (currentFile) {
      setCurrentFile(null);
      setPreviewUrl("");
    }
  };

  useEffect(() => {
    if (currentFile) {
      setColor(null);
    }

    if (design && !currentFile) {
      setColor(design?.background?.color);
      setPreviewUrl(design?.background?.image?.url)
    }
  }, [currentFile, design]);

  return (
    <div className="border-b-[1px] border-gray-100 pb-6 dark:border-offwhite/10">
      <h2 className="base-semibold">Background</h2>

      <div className="mt-4 large-gap">
        <div className="flex justify-center">
          <ColorPicker className="" color={color} onChange={changeColor} />
        </div>

        <div className="mt-4">
          <div className="h-64 w-full flex justify-center items-center bg-ghostwhite rounded-md dark:bg-dark-primary">
            <ImageUploader
              currentFile={currentFile}
              setCurrentFile={setCurrentFile}
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
              usedFor="custom-bg"
            />
          </div>
        </div>

        <button onClick={updaeBackground} className="mt-4 submit-btn text-white dark:text-dark-headline" type="button">
          Update Background
        </button>
      </div>
    </div>
  );
};
