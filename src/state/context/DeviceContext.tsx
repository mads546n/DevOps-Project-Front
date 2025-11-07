import { createContext } from "react";

export interface DeviceInfo {
    width: number;
    height: number;
    browser: string;
    device: "phone" | "tablet" | "computer";
}

export const DeviceContext = createContext<DeviceInfo | undefined>(undefined);
