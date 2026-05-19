import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { captureInitialAttribution } from "./lib/leadAttribution";

captureInitialAttribution();

createRoot(document.getElementById("root")!).render(<App />);
