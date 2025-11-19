import React, { useState, ReactNode } from "react";

type Props = {
    title: string;
    count?: number;
    defaultCollapsed?: boolean;
    actions?: ReactNode;      // optional buttons / filters on the right
    children: ReactNode;
};

export function AdminSectionShell({
                                      title,
                                      count,
                                      defaultCollapsed = false,
                                      actions,
                                      children,
                                  }: Props) {
    const [collapsed, setCollapsed] = useState(defaultCollapsed);

    const handleToggle = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <section
            className={
                "admin-section" + (collapsed ? " admin-section--collapsed" : "")
            }
        >
            <header className="admin-section__header">
                <button
                    type="button"
                    className="admin-section__toggle"
                    onClick={handleToggle}
                    aria-expanded={!collapsed}
                >
          <span className="admin-section__chevron">
            {collapsed ? "▶" : "▼"}
          </span>
                    <span className="admin-section__title">{title}</span>
                    {typeof count === "number" && (
                        <span className="admin-section__count">{count}</span>
                    )}
                </button>

                {actions && <div className="admin-section__actions">{actions}</div>}
            </header>

            {/* Only render body when not collapsed */}
            {!collapsed && <div className="admin-section__body">{children}</div>}
        </section>
    );
}
