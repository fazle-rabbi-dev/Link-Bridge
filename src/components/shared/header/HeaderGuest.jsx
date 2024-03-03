import { Moon, Sun, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components";
import { Logo } from "./Logo";
import { useThemeStore } from "@/zustand-stores";

export const HeaderGuest = () => {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const { isDarkThemeEnabled, toggleDarkTheme } = useThemeStore();
  
  return (
    <nav className="backdrop-blur w-full fixed top-0 z-50">
      <div className="bg-white rounded-full h-20 md:h-24 m-2 px-4 py-2 border-[1px] border-gray-300/50 flex justify-between items-center md:max-w-3xl xl:max-w-5xl md:mx-auto md:mt-6 dark:bg-dark-70 dark:bg-dark-secondary">
        <div className="w-4/12">
          <Logo />
        </div>

        <div className="flex justify-end flex-1 items-center gap-4 font-bold">
          <button className="py-2" type="button">
            <Link to="/sign-in">Login</Link>
          </button>
          <button className="bg-black rounded-full px-4 py-2 text-white dark:bg-white dark:text-black" type="button">
            <Link to="/sign-up">Sign up</Link>
          </button>

          <button onClick={toggleDarkTheme} type="button">
            {isDarkThemeEnabled ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>
    </nav>
  );
};
