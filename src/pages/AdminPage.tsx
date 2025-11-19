import React from "react";
import "../styles/adminPage.css";

import {
    ArtistsAdminSection,
    AdminArtist,
} from "../components/admin/ArtistsAdminSection";
import {
    ArtistApplicationsSection,
    ArtistApplication,
} from "../components/admin/ArtistApplicationsSection";
import {
    TagsAdminSection,
    AdminTag,
} from "../components/admin/TagsAdminSection";
import {
    ErrorLogSection,
    ErrorLogEntry,
} from "../components/admin/ErrorLogSection";

import {
    ArtistMessagesSection,
    ArtistMessage,
} from "../components/admin/ArtistMessagesSection";
import {
    AuctionsAdminSection,
    AdminAuction,
} from "../components/admin/AuctionsAdminSection";
import {
    UsersAdminSection,
    AdminUser,
} from "../components/admin/UsersAdminSection";
import {
    SystemHealthSection,
    SystemHealth,
} from "../components/admin/SystemHealthSection";
import {PanelStatus} from "../components/admin/PanelStatus";

// existing mocks (shortened if you already have them)
const mockArtists: AdminArtist[] = [
    { id: 1, name: "Karl Larhenhaus", email: "karl@example.com", createdAt: "2025-10-01", active: true },
    { id: 2, name: "Mathilde Fritzen", email: "mathilde@example.com", createdAt: "2025-10-05", active: true },
    { id: 3, name: "Joseph Monetzi", email: "joseph@example.com", createdAt: "2025-10-12", active: false },
];

const mockApplications: ArtistApplication[] = [
    { id: 101, name: "Anna Holm", email: "anna@example.com", appliedAt: "2025-11-10", portfolioUrl: "https://anna-art.com" },
    { id: 102, name: "Mads Sørensen", email: "mads@example.com", appliedAt: "2025-11-11" },
];

const mockTags: AdminTag[] = [
    { id: 1, name: "#abstrakt", usageCount: 42 },
    { id: 2, name: "#litografi", usageCount: 18 },
    { id: 3, name: "#moderne", usageCount: 27 },
    { id: 4, name: "#figurativ", usageCount: 9 },
];

const mockErrors: ErrorLogEntry[] = [
    {
        id: 1,
        timestamp: "2025-11-14 15:32",
        userId: "cust-123",
        path: "/auktion/42",
        message: "Failed to place bid – 500 from /api/auction/create",
        statusCode: 500,
    },
    {
        id: 2,
        timestamp: "2025-11-14 15:40",
        path: "/login",
        message: "Network error while calling /api/customer/create",
        statusCode: 0,
    },
];

// NEW MOCKS

const mockMessages: ArtistMessage[] = [
    {
        id: 1,
        artistId: 1,
        artistName: "Karl Larhenhaus",
        subject: "Spørgsmål til kommission",
        preview: "Hej, jeg vil gerne høre om…",
        createdAt: "2025-11-14 15:10",
        status: "new",
        unread: true,
    },
    {
        id: 2,
        artistId: 2,
        artistName: "Mathilde Fritzen",
        subject: "Problem med upload",
        preview: "Mit billede bliver ikke godkendt…",
        createdAt: "2025-11-14 14:05",
        status: "open",
        unread: false,
    },
];

const mockAuctions: AdminAuction[] = [
    {
        id: 1,
        title: "Forbandet fortid – Litografi",
        artistName: "Karl Larhenhaus",
        status: "live",
        currentBid: 30000,
        endsAt: "2025-11-20 20:00",
    },
    {
        id: 2,
        title: "Skyggernes dans – Akvarel",
        artistName: "Mathilde Fritzen",
        status: "scheduled",
        currentBid: null,
        endsAt: "2025-11-22 18:00",
    },
    {
        id: 3,
        title: "Tidens ekko – Akryl",
        artistName: "Joseph Monetzi",
        status: "draft",
        currentBid: null,
        endsAt: "—",
    },
];

const mockUsers: AdminUser[] = [
    {
        id: "cust-123",
        name: "Lars Kunde",
        email: "lars@example.com",
        role: "customer",
        createdAt: "2025-09-01",
        active: true,
    },
    {
        id: "artist-1",
        name: "Karl Larhenhaus",
        email: "karl@example.com",
        role: "artist",
        createdAt: "2025-09-10",
        active: true,
    },
    {
        id: "admin-1",
        name: "Admin Bruger",
        email: "admin@example.com",
        role: "admin",
        createdAt: "2025-08-20",
        active: true,
    },
];

const mockHealth: SystemHealth = {
    apiStatus: "up",
    dbStatus: "up",
    errorRate1h: 0.02,
    requestsPerMinute: 134,
    version: "1.0.3",
    lastDeployAt: "2025-11-14 13:45",
};
const refetchAll = () => {
    // later this will trigger React Query invalidations:
    // queryClient.invalidateQueries();
    console.log("Refreshing admin data…");
};

export default function AdminPage() {
    return (
        <main className="admin-page">
            <header className="admin-page__header">
                <h1>Adminpanel</h1>
                <PanelStatus onRefresh={refetchAll} />
            </header>

            <div className="admin-page__grid">
                <div className="admin-page__column">
                    <SystemHealthSection health={mockHealth} />
                    <ArtistsAdminSection artists={mockArtists} />
                    <UsersAdminSection users={mockUsers} />
                </div>

                <div className="admin-page__column">
                    <ArtistApplicationsSection applications={mockApplications} />
                    <AuctionsAdminSection auctions={mockAuctions} />
                    <ArtistMessagesSection messages={mockMessages} />
                    <TagsAdminSection tags={mockTags} />
                    <ErrorLogSection errors={mockErrors} />
                </div>
            </div>
        </main>
    );
}
