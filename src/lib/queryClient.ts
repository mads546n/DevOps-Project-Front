// src/lib/queryClient.ts
import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";

// Create a single global client
export const queryClient = new QueryClient();

// Persist to sessionStorage (or localStorage if we prefer)
const persister = createSyncStoragePersister({
    storage: window.sessionStorage,
});

// Wire persistence: keeps data across reloads (1 hour)
persistQueryClient({
    queryClient,
    persister,
    maxAge: 1000 * 60 * 60, // 1 hour
});
