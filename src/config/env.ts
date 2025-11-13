const { VITE_API_URL } = import.meta.env;

export const ENV = {
    API_URL: (VITE_API_URL as string) || "http://localhost:8080",
    // Feature flags if needed:
    ENABLE_LOGGING: import.meta.env.MODE !== "production",
};

/*
In .env.local: when deploying to production:
VITE_API_URL=https://api.ourdomain.com
* */