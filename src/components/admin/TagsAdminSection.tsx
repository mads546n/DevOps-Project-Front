// src/components/admin/TagsAdminSection.tsx
import React from "react";
import {AdminSectionShell} from "./AdminSectionShell";
import {AdminTag} from "../../state/types";

interface Props {
    tags: AdminTag[];
}

export function TagsAdminSection({ tags }: Props) {
    return (
        <AdminSectionShell title="Tags" defaultCollapsed={false}
        >
            <section className="admin-section">
                <header className="admin-section__header">
                    <h2>Tags</h2>
                    <span className="admin-section__count">{tags.length}</span>
                </header>

                <div className="admin-tags">
                    {tags.map((tag) => (
                        <div key={tag.id} className="admin-tag-chip">
                            <span className="admin-tag-chip__name">{tag.name}</span>
                            <span className="admin-tag-chip__count">{tag.usageCount}</span>
                        </div>
                    ))}
                </div>
            </section>

        </AdminSectionShell>

    );
}
