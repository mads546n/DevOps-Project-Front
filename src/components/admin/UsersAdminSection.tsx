import React from "react";

export type UserRole = "customer" | "artist" | "admin" | "support";

export interface AdminUser {
    id: number | string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: string;
    active: boolean;
}

interface Props {
    users: AdminUser[];
}

export function UsersAdminSection({ users }: Props) {
    return (
        <section className="admin-section">
            <header className="admin-section__header">
                <h2>Brugere</h2>
                <span className="admin-section__count">{users.length}</span>
            </header>

            <div className="admin-table admin-table--users">
                <div className="admin-table__head">
                    <span>Navn</span>
                    <span>Email</span>
                    <span>Rolle</span>
                    <span>Oprettet</span>
                    <span>Status</span>
                </div>
                <div className="admin-table__body">
                    {users.map((u) => (
                        <div key={u.id} className="admin-table__row">
                            <span>{u.name}</span>
                            <span>{u.email}</span>
                            <span>{mapRole(u.role)}</span>
                            <span>{u.createdAt}</span>
                            <span>{u.active ? "Aktiv" : "Deaktiveret"}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function mapRole(role: UserRole): string {
    switch (role) {
        case "customer":
            return "Kunde";
        case "artist":
            return "Kunstner";
        case "admin":
            return "Admin";
        case "support":
            return "Support";
    }
}
