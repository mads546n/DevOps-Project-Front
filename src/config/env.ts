// src/config/env.ts
const { VITE_API_URL } = import.meta.env;

export const ENV = {
    API_URL:
        (VITE_API_URL as string | undefined) ??
        "https://tetragallery-1084879122358.europe-west1.run.app",
    ENABLE_LOGGING: import.meta.env.MODE !== "production",
};
