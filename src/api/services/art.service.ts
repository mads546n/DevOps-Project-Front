//src/api/services/art.service.ts
import type { ArtItem } from "../../state/types";
import { http } from "../../lib/http";
import { safe } from "../utils/safeFetch";
import {PLACEHOLDER_ART_ITEM} from "../../state/placeholders/artCard.placeholder";

type ArtDTO = {
    id: number | string;
    title: string;
    price: number;
    imageUrl?: string;
};

async function _fetchArtList(): Promise<ArtItem[]> {
    const data = await http<ArtDTO[]>("/api/art");
    return data.map((art) => ({
        id: art.id,
        title: art.title,
        price: art.price,
        imageUrl: art.imageUrl,
    }));
}

export function fetchArtList(): Promise<ArtItem[]> {
    return safe(_fetchArtList, [PLACEHOLDER_ART_ITEM]);
}
