import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AvroViewer from "./components/AvroViewer.tsx";
import { ThemeProvider } from "./context/theme.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AvroViewer />
    </ThemeProvider>
  </StrictMode>
);
