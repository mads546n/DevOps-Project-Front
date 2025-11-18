// src/components/admin/ArtistApplicationsSection.tsx
import React from "react";

export interface ArtistApplication {
    id: number | string;
    name: string;
    email: string;
    appliedAt: string;
    portfolioUrl?: string;
}

interface Props {
    applications: ArtistApplication[];
}

export function ArtistApplicationsSection({ applications }: Props) {
    return (
        <section className="admin-section">
            <header className="admin-section__header">
                <h2>Ansøgninger om kunstnerprofil</h2>
                <span className="admin-section__count">{applications.length}</span>
            </header>

            <div className="admin-table admin-table--applications">
                <div className="admin-table__head">
                    <span>Navn</span>
                    <span>Email</span>
                    <span>Ansøgt</span>
                    <span>Portfolio</span>
                </div>
                <div className="admin-table__body">
                    {applications.map((app) => (
                        <div key={app.id} className="admin-table__row">
                            <span>{app.name}</span>
                            <span>{app.email}</span>
                            <span>{app.appliedAt}</span>
                            <span>
                {app.portfolioUrl ? (
                    <a href={app.portfolioUrl} target="_blank" rel="noreferrer">
                        Åbn
                    </a>
                ) : (
                    "—"
                )}
              </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
