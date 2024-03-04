import { useState, useEffect } from "react";
import eruda from "eruda";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { getLocalStorageItem } from "@/lib/utils";
import { useAuthStore, useThemeStore } from "@/zustand-stores";
import { useGetUser } from "@/lib/react-query";
import AppRoutes from "./_routes";


function App() {
  const [loggedInUserId, setLoggedInUserId] = useState("");

  // States from zustand-stores
  const setUser = useAuthStore(state => state.setUser);
  const toggleDarkTheme = useThemeStore(state => state.toggleDarkTheme);
  
  // Get currently logged in user
  const { data: loggedInUser, isPending: isLoadingUser } =
    useGetUser(loggedInUserId);

  useEffect(() => {
    eruda.init({
      element: document.getElementById("console"),
      tools: []
    });

    // Set logged in user id
    const user = getLocalStorageItem("loggedinUser");
    if (user) {
      setLoggedInUserId(user._id);
    } else {
      setUser(null);
    }

    // Enable auto dark theme
    const theme = getLocalStorageItem("theme");
    if (theme === "dark") {
      toggleDarkTheme();
    }
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, [loggedInUser]);

  return (
    <>
      <AppRoutes />
      <div id="console" />
      <Toaster />
    </>
  );
}

export default App;
