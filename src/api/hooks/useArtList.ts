// src/api/hooks/useArtList.ts
import { useQuery } from "@tanstack/react-query";
import { fetchArtList } from "../services/art.service";
import {ArtItem} from "../../state/types";

export function useArtList() {
    return useQuery<ArtItem[]>({
        queryKey: ["artList"],
        queryFn: fetchArtList,
        staleTime: 600_000, // 6 minuter – juster efter behov
    });
}
