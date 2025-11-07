/**
 * Represents a single artwork item shown in the carousel.
 */
export interface ArtItem {
    /** Unique identifier for the artwork */
    id: string | number;

    /** URL or local path to the artwork image */
    imageUrl: string;

    /** Artwork title (e.g., "Forbandet fortid – Litografi") */
    title: string;

    /** Artwork price in DKK (e.g., 30000) */
    price: number;
}

/**
 * Represents a collection of artworks by a specific artist.
 * Each artist will have one carousel section.
 */
export interface ArtistCarousel {
    /** Artist's display name (e.g., "Karl Larhenhaus") */
    artistName: string;

    /** List of artworks belonging to this artist */
    items: ArtItem[];
}
