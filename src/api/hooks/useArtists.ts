import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchArtists } from "../services/artist.service";

export function useArtists() {
    return useQuery({
        queryKey: ["artists"],
        queryFn: () => fetchArtists(),
        staleTime: 60_000,        // SWR window
        retry: 2,                 // retry on transient errors
    });
}

// mutation pattern
export function useAddArtist() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (payload: { name: string }) => {
            // POST example
            // return http<ArtistDTO>("/artists", { method: "POST", body: payload, authToken });
            return payload as any;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["artists"] }); // refresh list
        },
    });
}
