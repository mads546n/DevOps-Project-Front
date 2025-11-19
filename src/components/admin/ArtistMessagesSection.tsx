// src/components/admin/ArtistMessagesSection.tsx
import React from "react";
import { AdminSectionShell } from "./AdminSectionShell";
import {ArtistMessage} from "../../state/types";

interface Props {
    messages: ArtistMessage[];
}

export function ArtistMessagesSection({ messages }: Props) {
    return (
        <AdminSectionShell
            title="Kunstner-beskeder"
            count={messages.length}
            defaultCollapsed={false}
        >
            <div className="admin-table admin-table--messages">
                <div className="admin-table__head">
                    <span>Status</span>
                    <span>Kunstner</span>
                    <span>Emne</span>
                    <span>Modtaget</span>
                </div>
                <div className="admin-table__body">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={
                                "admin-table__row" +
                                (msg.unread ? " admin-table__row--unread" : "")
                            }
                        >
              <span>
                {msg.status === "new"
                    ? "Ny"
                    : msg.status === "open"
                        ? "Åben"
                        : "Lukket"}
              </span>
                            <span>{msg.artistName}</span>
                            <span>{msg.subject}</span>
                            <span>{msg.createdAt}</span>
                        </div>
                    ))}
                </div>
            </div>
        </AdminSectionShell>
    );
}
