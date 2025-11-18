// src/components/admin/ArtistsAdminSection.tsx
import React from "react";

export interface AdminArtist {
    id: number | string;
    name: string;
    email: string;
    createdAt: string;  // ISO string or formatted
    active: boolean;
}

interface Props {
    artists: AdminArtist[];
}

export function ArtistsAdminSection({ artists }: Props) {
    return (
        <section className="admin-section">
            <header className="admin-section__header">
                <h2>Artister</h2>
                <span className="admin-section__count">{artists.length}</span>
            </header>

            <div className="admin-table admin-table--artists">
                <div className="admin-table__head">
                    <span>Navn</span>
                    <span>Email</span>
                    <span>Oprettet</span>
                    <span>Status</span>
                </div>
                <div className="admin-table__body">
                    {artists.map((artist) => (
                        <div key={artist.id} className="admin-table__row">
                            <span>{artist.name}</span>
                            <span>{artist.email}</span>
                            <span>{artist.createdAt}</span>
                            <span>{artist.active ? "Aktiv" : "Deaktiveret"}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
