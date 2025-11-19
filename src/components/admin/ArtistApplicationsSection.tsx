// src/components/admin/ArtistApplicationsSection.tsx
import React from "react";
import { AdminSectionShell } from "./AdminSectionShell";
import {ArtistApplication} from "../../state/types";

interface Props {
    applications: ArtistApplication[];
}

export function ArtistApplicationsSection({ applications }: Props) {
    return (
        <AdminSectionShell
            title="Ansøgninger om kunstnerprofil: "
            count={applications.length}
            defaultCollapsed={false}
        >
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
                            <span
                                className="admin-table__cell admin-table__cell--ellipsis"
                                title={app.email}
                            >
                                {app.email}
                            </span>
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
        </AdminSectionShell>
    );
}
