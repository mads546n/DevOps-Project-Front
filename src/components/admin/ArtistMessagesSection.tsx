import React from "react";

export type MessageStatus = "new" | "open" | "closed";

export interface ArtistMessage {
    id: number | string;
    artistId: number | string;
    artistName: string;
    subject: string;
    preview: string;
    createdAt: string; // formatted string
    status: MessageStatus;
    unread: boolean;
}

interface Props {
    messages: ArtistMessage[];
}

export function ArtistMessagesSection({ messages }: Props) {
    return (
        <section className="admin-section">
            <header className="admin-section__header">
                <h2>Kunstner-beskeder</h2>
                <span className="admin-section__count">{messages.length}</span>
            </header>

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
        </section>
    );
}
