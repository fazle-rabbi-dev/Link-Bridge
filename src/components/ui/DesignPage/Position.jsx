import { useState, useEffect } from "react";
import { Github, Instagram, Twitter } from "lucide-react";
import { useUpdateProfileDesign } from "@/lib/react-query";
import { useThemeStore } from "@/zustand-stores";
import { showToast } from "@/lib/utils";

export const Position = () => {
  const [position, setPosition] = useState("");
  const design = useThemeStore(state => state.design);
  const { mutateAsync: updateDesign, isPending: isUpdating } = useUpdateProfileDesign();

  useEffect(() => {
    if (design?.socialPosition) {
      setPosition(design.socialPosition);
    }
  }, [design]);

  // =====================================================================================================================
  // Update Position
  // =====================================================================================================================
  const changePosition = async value => {
    setPosition(value);
    const data = {
      socialPosition: value
    };

    const res = await updateDesign({ data, type: "socialPosition" });
    if (res?.status === "Success") {
      showToast("Social position changed successfully.");
    } else {
      showToast(res.data.message, "error");
    }
  };

  return (
    <section className="bg-white rounded-md my-6 px-4 py-6 dark:bg-dark-secondary">
      <h2 className="base-semibold">Position to display socials</h2>
      <ul className="mt-6 grid grid-cols-2 gap-4">
        {["Top", "Bottom"].map(item => (
          <div key={item} onClick={() => changePosition(item)} className="flex flex-col items-center">
            <button className={`w-full p-2 ${position.toLowerCase() === item.toLowerCase() && "selected-item"}`}>
              <div className={`dark:bg-dark-primary rounded py-4 bg-ghostwhite flex gap-4 flex-col ${item === "Bottom" && "flex-col-reverse"}`}>
                <div className="flex gap-2 justify-center items-center">
                  <span className="text-gray-600">
                    <Instagram size={16} />
                  </span>
                  <span className="text-gray-600">
                    <Github size={16} />
                  </span>
                  <span className="text-gray-600">
                    <Twitter size={16} />
                  </span>
                </div>
                <div className="px-4 flex flex-col gap-2">
                  <div className="bg-white rounded-full py-2 w-full dark:bg-dark-secondary" type="button"></div>
                  <div className="bg-white rounded-full py-2 w-full dark:bg-dark-secondary" type="button"></div>
                </div>
              </div>
            </button>
            <p className="py-4">{item}</p>
          </div>
        ))}
      </ul>
    </section>
  );
};
