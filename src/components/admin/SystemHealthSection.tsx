// src/components/admin/SystemHealthSection.tsx
import React from "react";
import { AdminSectionShell } from "./AdminSectionShell";

export interface SystemHealth {
    apiStatus: "up" | "degraded" | "down";
    dbStatus: "up" | "degraded" | "down";
    errorRate1h: number;
    requestsPerMinute: number;
    version: string;
    lastDeployAt: string;
}

interface Props {
    health: SystemHealth;
}

export function SystemHealthSection({ health }: Props) {
    const errorPct = Math.round(health.errorRate1h * 100);

    return (
        <AdminSectionShell title="Systemstatus" defaultCollapsed={false}>
            <div className="system-health">
                <div className="system-health__row">
                    <span>API</span>
                    <span className={statusClass(health.apiStatus)}>
                        {mapStatus(health.apiStatus)}
                    </span>
                </div>
                <div className="system-health__row">
                    <span>Database</span>
                    <span className={statusClass(health.dbStatus)}>
            {mapStatus(health.dbStatus)}
          </span>
                </div>
                <div className="system-health__row">
                    <span>Fejlrate (1t)</span>
                    <span>{errorPct} %</span>
                </div>
                <div className="system-health__row">
                    <span>Requests / min</span>
                    <span>{health.requestsPerMinute}</span>
                </div>
                <div className="system-health__row">
                    <span>Version</span>
                    <span>{health.version}</span>
                </div>
                <div className="system-health__row">
                    <span>Sidste deploy</span>
                    <span>{health.lastDeployAt}</span>
                </div>
            </div>
        </AdminSectionShell>
    );
}

function mapStatus(status: "up" | "degraded" | "down"): string {
    switch (status) {
        case "up":
            return "Oppe";
        case "degraded":
            return "Degraderet";
        case "down":
            return "Nede";
    }
}

function statusClass(status: "up" | "degraded" | "down"): string {
    return `system-health__status system-health__status--${status}`;
}
