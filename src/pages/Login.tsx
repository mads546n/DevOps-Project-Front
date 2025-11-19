import { FormEvent, useEffect, useState } from "react";
import "../styles/loginStyles.css";
import { ENV } from "../config/env";
import type { LoggedInUser } from "../state/types/auth";

const API_BASE = ENV.API_URL ?? "http://localhost:8080";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState<LoggedInUser | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Restore user from localStorage on first render (optional but nice)
    useEffect(() => {
        if (typeof window === "undefined") return;
        const stored = window.localStorage.getItem("loggedInUser");
        if (stored) {
            try {
                const parsed = JSON.parse(stored) as LoggedInUser;
                if (parsed?.email && parsed?.role) {
                    setUser(parsed);
                }
            } catch {
                // ignore parse errors
            }
        }
    }, []);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await fetch(`${API_BASE}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                throw new Error("Forkert email eller adgangskode");
            }

            const data: LoggedInUser = await res.json();
            setUser(data);
            window.localStorage.setItem("loggedInUser", JSON.stringify(data));
            setPassword("");
        } catch (err: any) {
            setError(err.message ?? "Login fejlede");
        } finally {
            setLoading(false);
        }
    }

    function handleLogout() {
        setUser(null);
        setEmail("");
        setPassword("");
        setError(null);
        if (typeof window !== "undefined") {
            window.localStorage.removeItem("loggedInUser");
        }
    }

    if (!user) {
        return (
            <section className="login-page">
                <h1>Log ind</h1>
                <p className="login-subtitle">
                    Log ind som <strong>bruger</strong>, <strong>kunstner</strong> eller{" "}
                    <strong>administrator</strong>.
                </p>

                <form className="login-form" onSubmit={handleSubmit}>
                    <label>
                        Email
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                        />
                    </label>

                    <label>
                        Adgangskode
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </label>

                    <button type="submit" disabled={loading}>
                        {loading ? "Logger ind..." : "Log ind"}
                    </button>

                    {error && <p className="login-error">{error}</p>}
                </form>

                <div className="login-hint">
                    <p>Systemet returnerer rolle fra backend:</p>
                    <ul>
                        <li><strong>USER</strong> – almindelig køber</li>
                        <li><strong>ARTIST</strong> – sælger kunstværker</li>
                        <li><strong>ADMIN</strong> – kan give kunstner-rettigheder</li>
                    </ul>
                </div>
            </section>
        );
    }

    return (
        <section className="login-page">
            <header className="login-header">
                <div>
                    <h1>Velkommen, {user.name}</h1>
                    <p>
                        Du er logget ind som <strong>{user.role}</strong> ({user.email})
                    </p>
                </div>
                <button onClick={handleLogout}>Log ud</button>
            </header>

            {user.role === "COSTUMER" && (
                <div className="role-section">
                    <h2>Bruger-dashboard</h2>
                    <p>Du kan byde på auktioner og se dine køb.</p>
                    {}
                </div>
            )}

            {user.role === "ARTIST" && (
                <div className="role-section">
                    <h2>Kunstner-dashboard</h2>
                    <p>Du kan oprette nye kunstværker og starte auktioner.</p>
                    {}
                </div>
            )}

            {user.role === "ADMIN" && (
                <div className="role-section">
                    <h2>Admin-panel</h2>
                    <p>
                        Som admin kan du fx promovere en bruger til kunstner via{" "}
                        <code>POST /api/admin/promote/&lt;userId&gt;</code>
                    </p>
                    <p>
                    Placeholder til fremtidig UI.
                    </p>
                </div>
            )}
        </section>
    );
}