// src/components/admin/ArtistsAdminSection.tsx
import React from "react";
import { AdminSectionShell } from "./AdminSectionShell";

export interface AdminArtist {
    id: number | string;
    name: string;
    email: string;
    createdAt: string;
    active: boolean;
}

interface Props {
    artists: AdminArtist[];
}

export function ArtistsAdminSection({ artists }: Props) {
    return (
        <AdminSectionShell
            title=" Artister: "
            count={artists.length}
            defaultCollapsed={false}
        >
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
                            <span
                                className="admin-table__cell admin-table__cell--ellipsis"
                                title={artist.email}
                            >
                                {artist.email}
                            </span>
                            <span>{artist.createdAt}</span>
                            <span>{artist.active ? "Aktiv" : "Deaktiveret"}</span>
                        </div>
                    ))}
                </div>
            </div>
        </AdminSectionShell>
    );
}
