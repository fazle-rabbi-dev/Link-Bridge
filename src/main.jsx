import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryProvider } from "@/lib/react-query";
import { HelmetProvider } from "react-helmet-async";

import "./styles/global-style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryProvider>
    <HelmetProvider>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </HelmetProvider>
  </QueryProvider>
);
