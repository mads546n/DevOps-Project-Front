import { http } from "../../lib/http";
import { z } from "zod";
import { ArtistSchema } from "../schemas/artist";

const ArtistListSchema = z.array(ArtistSchema);

export async function fetchArtists(token?: string) {
    const data = await http<unknown>("/artists", { authToken: token });
    return ArtistListSchema.parse(data); // runtime validation
}

export async function fetchArtistById(id: string | number, token?: string) {
    const data = await http<unknown>(`/artists/${id}`, { authToken: token });
    return ArtistSchema.parse(data);
}
