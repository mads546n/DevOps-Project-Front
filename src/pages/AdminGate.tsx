// src/pages/AdminGate.tsx
import { FormEvent, useEffect, useState } from "react";
import AdminPage from "./AdminPage";
import "../styles/adminGate.css";

const ADMIN_FLAG_KEY = "tetra_is_admin";
// TEMP: for demo only – We should ofc not ship like this
const DEMO_ADMIN_PASSWORD =
    import.meta.env.VITE_ADMIN_PASSWORD || "1234";

export default function AdminGate() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    // On mount: check if already “logged in”
    useEffect(() => {
        const stored = localStorage.getItem(ADMIN_FLAG_KEY);
        if (stored === "true") {
            setIsAdmin(true);
        }
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password === DEMO_ADMIN_PASSWORD) {
            localStorage.setItem(ADMIN_FLAG_KEY, "true");
            setIsAdmin(true);
            setPassword("");
        } else {
            setError("Forkert adgangskode.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem(ADMIN_FLAG_KEY);
        setIsAdmin(false);
        setPassword("");
    };

    if (!isAdmin) {
        return (
            <section className="admin-gate">
                <main className="admin-login">
                    <h1>Admin login</h1>
                    <p>Dette område er kun for administratorer.</p>

                    <form onSubmit={handleSubmit} className="admin-login__form">
                        <label className="admin-login__field">
                            <span>Adgangskode</span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                        </label>
                        {error && <p className="admin-login__error">{error}</p>}

                        <button type="submit" className="ui-button primary">
                            Log ind
                        </button>
                    </form>
                </main>
            </section>
        );
    }

    return (
        <main>
            <div className="admin-topbar">
                <span>Logget ind som admin.. : Midlertidig log ud knap {"->"}</span>
                <button className="ui-button secondary" onClick={handleLogout}>
                    Log ud
                </button>
            </div>
            <AdminPage />
        </main>
    );
}
