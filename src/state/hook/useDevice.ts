import { useEffect, useState } from "react";
import type { DeviceInfo } from "../context/DeviceContext";

function detectBrowser(): string {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("chrome")) return "chrome";
    if (userAgent.includes("firefox")) return "firefox";
    if (userAgent.includes("safari")) return "safari";
    if (userAgent.includes("edge")) return "edge";
    return "unknown";
}

function detectDevice(width: number): "phone" | "tablet" | "computer" {
    if (width < 650) return "phone";
    if (width < 1024) return "tablet";
    return "computer";
}

export function useDevice(): DeviceInfo {
    const [info, setInfo] = useState<DeviceInfo>(() => {
        const width = window.innerWidth;
        return {
            width,
            height: window.innerHeight,
            browser: detectBrowser(),
            device: detectDevice(width),
        };
    });

    useEffect(() => {
        function handleResize() {
            setInfo({
                width: window.innerWidth,
                height: window.innerHeight,
                browser: detectBrowser(),
                device: detectDevice(window.innerWidth),
            });
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return info;
}
