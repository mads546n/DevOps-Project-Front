import { ENV } from "../config/env";

type HttpOptions = {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    headers?: Record<string, string>;
    body?: unknown;
    signal?: AbortSignal;
    authToken?: string | null;
    timeoutMs?: number;
};

const DEFAULT_TIMEOUT = 12_000;

console.log("API_URL:", ENV.API_URL);

export class HttpError extends Error {
    status: number;
    data: unknown;
    constructor(status: number, data: unknown, message?: string) {
        super(message || `HTTP ${status}`);
        this.status = status;
        this.data = data;
    }
}

export async function http<T>(
    path: string,
    {
        method = "GET",
        headers,
        body,
        authToken,
        signal,
        timeoutMs = DEFAULT_TIMEOUT,
    }: HttpOptions = {}
): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const url = path.startsWith("http") ? path : `${ENV.API_URL}${path}`;

    const res = await fetch(url, {
        method,
        headers: {
            ...(body ? { "Content-Type": "application/json" } : {}),
            ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: signal ?? controller.signal,
        // credentials: "include", // kun hvis I bruger cookies; ellers kan du fjerne den
    }).catch((e) => {
        clearTimeout(timeout);
        if (e.name === "AbortError") throw new Error("Request timeout");
        throw e;
    });

    clearTimeout(timeout);

    const contentType = res.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
        ? await res.json()
        : await res.text();

    if (!res.ok) {
        throw new HttpError(res.status, data, (data as any)?.message);
    }

    return data as T;
}
