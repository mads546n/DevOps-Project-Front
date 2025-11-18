import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/headerStyles.css";
import { useDevice } from "../state/hook/useDevice";

type HeaderLink = { href: string; label: string };

const leftLinks: HeaderLink[] = [
    { href: "/", label: "Forside" },
    { href: "/auktioner", label: "Auktioner" },
    { href: "/om-os", label: "Om os" },
];

const rightLinks: HeaderLink[] = [
    { href: "/search", label: "Søg" },
    { href: "/login", label: "Log ind" },
];

export default function Header() {
    const [elevated, setElevated] = useState(false);
    const device = useDevice();

    useEffect(() => {
        const onScroll = () => setElevated(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`site-header ${elevated ? "is-elevated" : ""}`}
            role="banner"
        >
            {/* === DEV INFO BAR === */}
            <div className="dev-info-bar">
                <span>
                    <strong>Device:</strong> {device.device}
                </span>
                <span>
                    <strong>Browser:</strong> {device.browser}
                </span>
                <span>
                    <strong>Width:</strong> {device.width}px
                </span>
                <span>
                    <strong>Height:</strong> {device.height}px
                </span>
            </div>

            <nav className="site-header__nav" aria-label="Hovednavigation">
                {/* LEFT LINKS */}
                <ul className="nav-left">
                    {leftLinks.map((l) => (
                        <li key={l.href}>
                            <Link className="nav-link" to={l.href}>
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* BRAND */}
                <Link className="brand" to="/" aria-label="TETRA ART – Forside">
                    <span style={{ color: "#7F170E" }}>TETRA ART</span>
                </Link>

                {/* RIGHT LINKS */}
                <ul className="nav-right">
                    {rightLinks.map((l) => (
                        <li key={l.href}>
                            <Link className="nav-link" to={l.href}>
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
