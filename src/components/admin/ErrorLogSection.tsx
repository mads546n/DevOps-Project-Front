// src/components/admin/ErrorLogSection.tsx
import React from "react";

export interface ErrorLogEntry {
    id: number | string;
    timestamp: string;
    userId?: string | number;
    path: string;
    message: string;
    statusCode?: number;
}

interface Props {
    errors: ErrorLogEntry[];
}

export function ErrorLogSection({ errors }: Props) {
    return (
        <section className="admin-section">
            <header className="admin-section__header">
                <h2>Fejl fra brugere</h2>
                <span className="admin-section__count">{errors.length}</span>
            </header>

            <div className="admin-table admin-table--errors">
                <div className="admin-table__head">
                    <span>Tidspunkt</span>
                    <span>Bruger</span>
                    <span>Path</span>
                    <span>Besked</span>
                    <span>HTTP</span>
                </div>
                <div className="admin-table__body">
                    {errors.map((err) => (
                        <div key={err.id} className="admin-table__row admin-table__row--error">
                            <span>{err.timestamp}</span>
                            <span>{err.userId ?? "Anonym"}</span>
                            <span>{err.path}</span>
                            <span>{err.message}</span>
                            <span>{err.statusCode ?? "—"}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
