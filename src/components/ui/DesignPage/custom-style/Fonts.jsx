import { useState } from "react";
import { ColorPicker } from "./ColorPicker";
import { fonts } from "@/constants";
import { showToast } from "@/lib/utils";
import { useUpdateProfileDesign } from "@/lib/react-query";
import { useThemeStore } from "@/zustand-stores";
import { Loading } from "@/components"

export const Fonts = () => {
  const [color, setColor] = useState("#fff");
  
  const design = useThemeStore(state => state.design);
  const { mutateAsync: updateDesign, isPending: isUpdating } = useUpdateProfileDesign();
  
  // =====================================================================================================================
  // Change Font Style (Family & Color)
  // =====================================================================================================================
  const handleUpdateFontStyle = async (type, value) => {
    const data = {};
    
    if (type === "fontFamily") {
      data.fontStyle = {
        fontFamily: value.family
      };
    }

    if (type === "fontColor") {
      data.fontStyle = {
        fontColor: value
      };
    }

    const res = await updateDesign({ data, type: "fontStyle" });

    if (res?.status === "Success") {
      showToast("Font changed successfully.");
    } else {
      showToast(res.error.message || "Font change failed.", "error");
    }
  };

  return (
    <div className="">
      <h2 className="base-semibold">Fonts</h2>

      <ul className="mt-4 grid grid-cols-2 gap-4">
        {fonts.map(font => (
          <button
            key={font.name}
            className={`py-1 px-4 rounded-md border-[1px] border-gray-200 text-sm ${font.family} dark:border-offwhite/10 ${
              design?.fontStyle?.fontFamily === font.family && "selected-item"
            }`}
            key={font.id}
            type="button"
            onClick={() => handleUpdateFontStyle("fontFamily", font)}
          >
            {font.name}
          </button>
        ))}
      </ul>

      <div className="mt-4 flex justify-between items-center">
        <ColorPicker color={color} setColor={setColor} />
        <button disabled={isUpdating} onClick={() => handleUpdateFontStyle("fontColor", color)} type="button" className="btn-gradient w-40">
          {
            isUpdating ? <Loading /> : "Update Color"
          }
        </button>
      </div>
    </div>
  );
};
