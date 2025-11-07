// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/uiStyles.css";
import "./styles/globalStyles.css";
import App from "./App";
import {DeviceProvider} from "./state/provider/DeviceProvider";
import Header from "./components/Header";

const rootEl = document.getElementById("root");
if (!rootEl) {
    throw new Error('Root element with id="root" not found');
}

createRoot(rootEl).render(
    <StrictMode>
        <DeviceProvider>
            <Header />
            <App />
        </DeviceProvider>
    </StrictMode>
);
