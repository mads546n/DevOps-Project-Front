import React from "react";
import {AdminSectionShell} from "./AdminSectionShell";
import {AdminAuction} from "../../state/types";

export type AuctionStatus = "draft" | "scheduled" | "live" | "ended" | "cancelled";

interface Props {
    auctions: AdminAuction[];
}

export function AuctionsAdminSection({ auctions }: Props) {
    return (
        <AdminSectionShell
            title="Kunstværker: "
            count={auctions.length}
            defaultCollapsed={false}
        >
            <section className="admin-section">
                <div className="admin-table admin-table--auctions">
                    <div className="admin-table__head">
                        <span>Værk</span>
                        <span>Kunstner</span>
                        <span>Status</span>
                        <span>Aktuelt bud</span>
                        <span>Slutter</span>
                    </div>
                    <div className="admin-table__body">
                        {auctions.map((a) => (
                            <div key={a.id} className="admin-table__row">
                                <span>{a.title}</span>
                                <span>{a.artistName}</span>
                                <span>{mapStatus(a.status)}</span>
                                <span>{a.currentBid != null ? `${a.currentBid.toLocaleString("da-DK")} DKK` : "—"}</span>
                                <span>{a.endsAt}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </AdminSectionShell>

    );
}

function mapStatus(status: AuctionStatus): string {
    switch (status) {
        case "draft":
            return "Kladde";
        case "scheduled":
            return "Planlagt";
        case "live":
            return "Live";
        case "ended":
            return "Afsluttet";
        case "cancelled":
            return "Annulleret";
    }
}
