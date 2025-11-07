import { useEffect, useState } from "react";
import "../styles/headerStyles.css";
import {useDevice} from "../state/hook/useDevice";

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
            {/* === DEV INFO BAR (TEMPORARY WORK-TOOL === */}
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
            {/* === END DEV INFO BAR (TEMPORARY WORK-TOOL === */}

            <nav className="site-header__nav" aria-label="Hovednavigation">
                <ul className="nav-left">
                    {leftLinks.map((l) => (
                        <li key={l.href}>
                            <a className="nav-link" href={l.href}>
                                {l.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <a className="brand" href="/" aria-label="TETRA ART – Forside">
                    <span style={{ color: "#7F170E" }}>TETRA ART</span>
                </a>

                <ul className="nav-right">
                    {rightLinks.map((l) => (
                        <li key={l.href}>
                            <a className="nav-link" href={l.href}>
                                {l.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
