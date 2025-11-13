// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/uiStyles.css";
import "./styles/globalStyles.css";
import App from "./App";
import {DeviceProvider} from "./state/provider/DeviceProvider";
import Header from "./components/Header";
import {Footer} from "./components/Footer";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const rootEl = document.getElementById("root");
if (!rootEl) {
    throw new Error('Root element with id="root" not found');
}
const queryClient = new QueryClient();

createRoot(rootEl).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <DeviceProvider>
                    <Header />
                    <App />
                    <Footer />
                </DeviceProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);
