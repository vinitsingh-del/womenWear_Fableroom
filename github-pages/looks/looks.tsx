import React from "react";
import { createRoot } from "react-dom/client";
import LooksPage from "../../app/looks/page";
import "../../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LooksPage />
  </React.StrictMode>,
);
