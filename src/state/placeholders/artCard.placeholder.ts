import type { ArtItem, ArtistCarousel } from "../types";

export const PLACEHOLDER_ART_IMAGE = "/placeholderImage.png";

export const PLACEHOLDER_ART_ITEM: ArtItem = {
    id: "error-item",
    title: "Kunne ikke hente værker — prøv at genindlæse",
    price: 0,
    imageUrl: PLACEHOLDER_ART_IMAGE,
    isPlaceholder: true,
};

export const PLACEHOLDER_ART_ITEMS: ArtItem[] = [
    {
        id: "error-1",
        title: "Der opstod en fejl ved hentning af auktioner",
        price: 0,
        imageUrl: PLACEHOLDER_ART_IMAGE,
        isPlaceholder: true,
    },
    {
        id: "error-2",
        title: "Prøv at genindlæse siden for at hente nyeste værker",
        price: 0,
        imageUrl: PLACEHOLDER_ART_IMAGE,
        isPlaceholder: true,
    },
    {
        id: "error-3",
        title: "Hvis problemet fortsætter, kontakt Tetra Art support",
        price: 0,
        imageUrl: PLACEHOLDER_ART_IMAGE,
        isPlaceholder: true,
    },
];

export const PLACEHOLDER_CAROUSEL: ArtistCarousel = {
    artistName: "Fejl – kunne ikke hente auktioner",
    items: PLACEHOLDER_ART_ITEMS,
};
