import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loading, Avatar } from "@/components";
import { Moon, Sun, Github } from "lucide-react";
import { useAuthStore, useThemeStore } from "@/zustand-stores";
import { Logo } from "./Logo";
import { DashboardNavLinks } from "./DashboardNavLinks"

export const HeaderDashboard = () => {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const navigate = useNavigate();
  
  // States from zustand-stores
  const { isLoggedIn, logOut, isLoggingOut, user } = useAuthStore();
  const { isDarkThemeEnabled, toggleDarkTheme } = useThemeStore(state => ({
    isDarkThemeEnabled: state.isDarkThemeEnabled,
    toggleDarkTheme: state.toggleDarkTheme
  }));
  
  const toggleUserMenu = () => {
    setOpenUserMenu(prev => !prev);
  };

  const handleLogout = async () => {
    toggleUserMenu();
    await logOut();
    navigate("/sign-in");
  };

  return (
    <header className="fixed z-50 top-0 w-full py-6 px-6 bg-white shadow-md dark:bg-dark-secondary">
      <div className="max-container flex items-center justify-between">
        <div className="w-4/12">
          <Logo redirect="/dashboard/links" />
        </div>

        <div className="flex flex-1 gap-3 justify-end">
          <p className="flex items-center">
            <Link target="_blank" to="https://github.com/fazle-rabbi-dev/Link-Bridge" className="px-2 py-2" type="button">
              <span>
                <Github size={27} />
              </span>
            </Link>
            <button onClick={toggleDarkTheme} className="px-2 py-2" type="button">
              <span>{isDarkThemeEnabled ? <Sun size={27} /> : <Moon size={27} />}</span>
            </button>
          </p>

          {isLoggingOut ? (
            <Loading color="#b054fd" />
          ) : (
            <button onClick={toggleUserMenu} className="" type="button">
              {user?.profilePic?.url ? <img className="w-10 rounded-full" src={user?.profilePic?.url} alt="Avatar" /> : <Avatar text={user?.name} />}
            </button>
          )}
        </div>
      </div>

      {/* User Menu */}
      <div
        className={`${
          !openUserMenu && "hidden"
        } bg-white rounded border-[.5px] border-gray-200/60 shadow-md absolute top-20 right-6 w-[70%] md:w-[30%] md:right-28 dark-mode dark:border-ghostwhite/20`}
      >
        <div className="mt-6 px-6 flex items-center gap-2">
          <span>{user?.profilePic?.url ? <img className="w-10 h-10" src={user?.profilePic?.url} alt="Avatar" /> : <Avatar text={user?.name} />}</span>
          <div className="">
            <p className="font-bold text-sm">{user?.name}</p>
            <p className="text-sm body-regular dark:text-ghostwhite/80">@{user?.username}</p>
          </div>
        </div>

        <ul className="w-full mt-6 font-thin flex flex-col">
          <button className="px-6 py-3 border-t-[1px] text-start dark:border-ghostwhite/20" type="button">
            <Link onClick={toggleUserMenu} to="/user/account-settings">
              Account settings
            </Link>
          </button>
          <button type="button" onClick={handleLogout} className="px-6 py-3 border-t-[1px] text-start dark:border-ghostwhite/20">
            Logout
          </button>
        </ul>
      </div>

      <DashboardNavLinks />
    </header>
  );
};
