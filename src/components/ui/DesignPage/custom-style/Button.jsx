import { useState } from "react";
import { buttonStyles } from "@/constants";
import { showToast } from "@/lib/utils";
import { ColorPicker } from "./ColorPicker";
import { useUpdateProfileDesign } from "@/lib/react-query";
import { useThemeStore } from "@/zustand-stores";
import { Loading } from "@/components"

export const Button = () => {
  const [selectedButton, setSelectedButton] = useState("");
  const [textColor, setTextColor] = useState("");
  const [bgColor, setBgColor] = useState("");

  const design = useThemeStore(state => state.design);
  const { mutateAsync: updateDesign, isPending: isUpdating } = useUpdateProfileDesign();
  
  // =====================================================================================================================
  // Update Button Style
  // =====================================================================================================================
  const changeButtonStyle = async (type, value) => {
    const data = {};
    
    if (type === "radius") {
      setSelectedButton(value.name);
      data.buttonStyle = {
        radius: value.style,
        type: value.type
      };
    }

    if (type === "bgColor") {
      data.buttonStyle = {
        bgColor
      };
    }

    if (type === "textColor") {
      data.buttonStyle = {
        textColor
      };
    }

    const res = await updateDesign({ data, type: "buttonStyle" });

    if (res?.status === "Success") {
      showToast("Button style changed successfully.");
    } else {
      showToast(res.data.message, "error");
    }
  };

  return (
    <div className="border-b-[1px] border-gray-100 pb-8 dark:border-offwhite/10">
      <h2 className="base-semibold">Button</h2>

      <ul className="mt-4 grid grid-cols-3 gap-6">
        {buttonStyles.map(button => (
          <button
            onClick={() => changeButtonStyle("radius", button)}
            className={`px-4 py-4 ${button.style} ${
              button.type === "fill" ? "bg-black dark:bg-ghostwhite" : "border-2 border-black dark:border-ghostwhite"
            } ${design?.buttonStyle?.radius === button.style && design?.buttonStyle?.type === button.type && "selected-item"} `}
            key={button.id}
            type="button"
          ></button>
        ))}
      </ul>

      <div className="mt-8 grid gap-4 grid-cols-1 justify-between items-center">
        <div className="flex justify-between items-center gap-2">
          <ColorPicker color={bgColor} setColor={setBgColor} />
          <button
            disabled={isUpdating}
            onClick={() => changeButtonStyle("bgColor")}
            className="w-40 text-sm gradient_purple-pink text-white px-4 py-2 rounded"
            type="button"
          >
            {
              isUpdating ? <Loading /> : "Update Bg Color"
            }
          </button>
        </div>

        <div className="flex justify-between items-center gap-2">
          <ColorPicker color={textColor} setColor={setTextColor} />
          <button
            disabled={isUpdating}
            onClick={() => changeButtonStyle("textColor")}
            className="w-40 text-sm gradient_purple-pink text-white px-4 py-2 rounded"
            type="button"
          >
            {
              isUpdating ? <Loading /> : "Update Text Color"
            }
          </button>
        </div>
      </div>
    </div>
  );
};
