import { useArtists } from "../api/hooks/useArtists";

export function ArtistList() {
    const { data, isLoading, isError, error } = useArtists();

    if (isLoading) return <p>Henter…</p>;
    if (isError) return <p>Fejl: {(error as Error).message}</p>;

    return (
        <ul>
            {data!.map((a) => (
                <li key={a.id}>{a.name} ({a.items.length})</li>
            ))}
        </ul>
    );
}
