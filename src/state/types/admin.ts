// src/state/types/admin.ts

// ----- Artists -----
export interface AdminArtist {
    id: number | string;
    name: string;
    email: string;
    createdAt: string;   // ISO eller formateret string
    active: boolean;
}

// ----- Artist applications -----
export interface ArtistApplication {
    id: number | string;
    name: string;
    email: string;
    appliedAt: string;
    portfolioUrl?: string;
}

// ----- Tags -----
export interface AdminTag {
    id: number | string;
    name: string;        // f.eks. "#abstrakt"
    usageCount: number;
}

// ----- Error log -----
export interface ErrorLogEntry {
    id: number | string;
    timestamp: string;
    userId?: string | number;
    path: string;
    message: string;
    statusCode?: number;
}

// ----- Artist messages -----
export type MessageStatus = "new" | "open" | "closed";

export interface ArtistMessage {
    id: number | string;
    artistId: number | string;
    artistName: string;
    subject: string;
    preview: string;
    createdAt: string;
    status: MessageStatus;
    unread: boolean;
}

// ----- Auctions -----
export type AuctionStatus = "draft" | "scheduled" | "live" | "ended" | "cancelled";

export interface AdminAuction {
    id: number | string;
    title: string;
    artistName: string;
    status: AuctionStatus;
    currentBid: number | null;
    endsAt: string;
}

// ----- Users / roles -----
export type UserRole = "customer" | "artist" | "admin" | "support";

export interface AdminUser {
    id: number | string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: string;
    active: boolean;
}

// ----- System health -----
export interface SystemHealth {
    apiStatus: "up" | "degraded" | "down";
    dbStatus: "up" | "degraded" | "down";
    errorRate1h: number;       // 0–1
    requestsPerMinute: number;
    version: string;
    lastDeployAt: string;
}
