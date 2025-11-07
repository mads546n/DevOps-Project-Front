// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import {DeviceProvider} from "./state/provider/DeviceProvider";

const rootEl = document.getElementById("root");
if (!rootEl) {
    throw new Error('Root element with id="root" not found');
}

createRoot(rootEl).render(
    <StrictMode>
        <DeviceProvider>
            <App />
        </DeviceProvider>
    </StrictMode>
);
