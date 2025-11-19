// src/api/utils/safeFetch.ts

export async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
    try {
        return await fn();
    } catch (err) {
        console.error("Fetch failed:", err);
        return fallback;
    }
}
