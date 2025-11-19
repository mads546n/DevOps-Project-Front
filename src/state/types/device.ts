// src/state/types/device.ts

export type DeviceKind = "phone" | "tablet" | "computer";

export interface DeviceInfo {
    width: number;
    height: number;
    browser: string;
    device: DeviceKind;
}
