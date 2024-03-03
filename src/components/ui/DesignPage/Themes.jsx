import { useState } from "react";
import { useUpdateProfileDesign } from "@/lib/react-query";
import { useThemeStore } from "@/zustand-stores";
import { showToast } from "@/lib/utils";
import { themes } from "@/constants";

export const Themes = () => {
  const [selectedTheme, setSelectedTheme] = useState("");
  const { mutateAsync: updateDesign, isPending: isUpdating } = useUpdateProfileDesign();
  
  const updateTheme = async themeName => {
    setSelectedTheme(themeName.name);
    const { style } = themeName;
    const data = {
      theme: style
    };

    const res = await updateDesign({ data, type: "theme" });
    
    if (res?.status === "Success") {
      showToast("Theme updated successfully.");
    } else {
      showToast(res.data.message, "error");
    }
  };

  return (
    <section className="bg-white rounded-md my-6 px-4 py-6 dark-mode md:my-14">
      <h2 className="base-semibold">Themes</h2>
      <ul className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-8">
        {themes.map(theme => (
          <Theme key={theme.id} theme={theme} selectedTheme={selectedTheme} updateTheme={updateTheme} />
        ))}
      </ul>
    </section>
  );
};

const Theme = ({ theme, selectedTheme, updateTheme }) => {
  const design = useThemeStore(state => state.design);

  return (
    <li className="">
      <button
        onClick={() => updateTheme(theme)}
        className={`${theme?.style} h-48 w-full rounded-md border-[1px] border-gray-50 md:h-[400px]  ${
          design.theme === theme.style && "selected-item"
        } `}
      ></button>
      <p className="body-regular my-2 text-center">{theme?.name}</p>
    </li>
  );
};
