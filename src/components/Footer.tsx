import "../styles/footerStyles.css"

import React from "react";
import { Link } from "react-router-dom";

export function Footer() {

    return (
        <footer
            className="ui-footer"
            style={{
                padding: "1rem",
                backgroundColor: "var(--bg-color)",
                color: "var(--text-color)",
                borderTop: "1px solid var(--border-color, #ddd)",
            }}
        >
            <nav style={{ marginBottom: "0.5rem" }}>
                <ul
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: "1rem",
                        padding: 0,
                        margin: 0,
                        listStyle: "none",
                    }}
                >
                    <li>
                        <Link to="/info#about" style={{ textDecoration: "none", color: "inherit" }}>
                            Om
                        </Link>
                    </li>
                    <li>
                        <Link to="/info#security" style={{ textDecoration: "none", color: "inherit" }}>
                            Sikkerhed
                        </Link>
                    </li>
                    <li>
                        <Link to="/info#privacy" style={{ textDecoration: "none", color: "inherit" }}>
                            Privatliv
                        </Link>
                    </li>

                </ul>
            </nav>
            <p
                style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    opacity: 0.7,
                    margin: 0,
                }}
            >
                © {new Date().getFullYear()} Tetra. Alle rettigheder forbeholdt            </p>
        </footer>
    );
}
