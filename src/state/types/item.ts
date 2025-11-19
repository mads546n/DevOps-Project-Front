// src/state/types/item.ts
export interface ArtItem {
    id: number | string;
    title: string;
    price: number;
    imageUrl?: string | undefined;
    isPlaceholder?: boolean;
}

export interface ArtistCarousel {
    artistName: string;
    items: ArtItem[];
}
