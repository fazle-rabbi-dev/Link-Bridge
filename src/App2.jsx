/*
  
*/
import { useState, useEffect } from "react";
import eruda from "eruda";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { getLocalStorageItem } from "@/lib/utils";
import { useAuthStore, useThemeStore } from "@/zustand-stores";
import { useGetUser } from "@/lib/react-query";
import AppRoutes from "./_routes";


function App() {
  
  useEffect(() => {
    eruda.init({
      element: document.getElementById("console"),
      tools: []
    });
  })
  
  return (
    <>
      <h1 className="">Home</h1>
      <div id="console" />
      <Toaster />
      <AppRoutes />
    </>
  );
}

export default App;
