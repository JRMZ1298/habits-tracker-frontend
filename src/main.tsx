import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HabitsMain } from "./HabitsMain";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HabitsMain />
  </StrictMode>,
);
