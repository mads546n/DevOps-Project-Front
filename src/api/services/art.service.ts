// src/api/services/art.service.ts
import type { ArtItem } from "../../state/types";
import { http } from "../../lib/http";

export type ArtListOptions = {
    page?: number;
    size?: number;
};

// matcher ProductDtoGet fra OpenAPI
type ProductDtoGet = {
    id: number;
    description: string;
    artistName: string;
    tags: string[];
};

export async function fetchArtList(
    options: ArtListOptions = {}
): Promise<ArtItem[]> {
    const params = new URLSearchParams();

    if (options.page != null) params.set("page", String(options.page));
    if (options.size != null) params.set("size", String(options.size));

    const query = params.toString();
    const path = query ? `/api/art?${query}` : "/api/art";

    const data = await http<ProductDtoGet[]>(path);

    return data.map<ArtItem>((p) => ({
        id: p.id,
        title: p.description,   // vi bruger description som titel
        // price: undefined,    // ingen pris endnu i API'et
        // imageUrl: undefined, // ingen imageUrl endnu
    }));
}
