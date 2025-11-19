// src/api/hooks/useArtList.ts
import { useQuery } from "@tanstack/react-query";
import type { ArtItem } from "../../state/types";
import { fetchArtList, type ArtListOptions } from "../services/art.service";

export function useArtList(options: ArtListOptions = {}) {
    return useQuery<ArtItem[], Error>({
        queryKey: ["artList", options],      // cache pr. kombination
        queryFn: () => fetchArtList(options),
        staleTime: 600_000,
    });
}
