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

    // Restore user from localStorage on first render
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

            const data = (await res.json()) as LoggedInUser;

            setUser(data);
            window.localStorage.setItem("loggedInUser", JSON.stringify(data));
            window.localStorage.setItem("authToken", data.token);

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
            window.localStorage.removeItem("authToken");
        }
    }

    // Helper for admin promote / revoke calls
    async function callAdmin(url: string) {
        if (!user) return;

        setError(null);

        try {
            const res = await fetch(`${API_BASE}${url}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (!res.ok) {
                throw new Error(`Admin-kald fejlede (${res.status})`);
            }
        } catch (err: any) {
            setError(err.message ?? "Admin-kald fejlede");
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
                        <li><strong>COSTUMER</strong> – almindelig køber</li>
                        <li><strong>ARTIST</strong> – sælger kunstværker</li>
                        <li><strong>ADMIN</strong> – kan give/fjerne kunstner-rettigheder</li>
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
                </div>
            )}

            {user.role === "ARTIST" && (
                <div className="role-section">
                    <h2>Kunstner-dashboard</h2>
                    <p>Du kan oprette nye kunstværker og starte auktioner.</p>
                </div>
            )}

            {user.role === "ADMIN" && (
                <div className="role-section">
                    <h2>Admin-panel</h2>
                    <p>Som admin kan du give og fjerne kunstner-rettigheder for brugere.</p>

                    <AdminUserSelector
                        token={user.token}
                        onPromote={(id) => callAdmin(`/api/admin/promote/${id}`)}
                        onRevoke={(id) => callAdmin(`/api/admin/revoke/${id}`)}
                        error={error}
                    />
                </div>
            )}
        </section>
    );
}

function AdminUserSelector({
                               token,
                               onPromote,
                               onRevoke,
                               error,
                           }: {
    token: string;
    onPromote: (id: number) => void;
    onRevoke: (id: number) => void;
    error: string | null;
}) {
    const [users, setUsers] = useState<
        { id: number; name: string; email: string; role: string }[]
    >([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [loadError, setLoadError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch(`${API_BASE}/api/admin/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error("Kunne ikke hente brugerliste");
                }

                const data = await res.json();
                setUsers(data);

                if (data.length > 0) {
                    setSelectedId(data[0].id);
                }
            } catch (err: any) {
                setLoadError(err.message);
            }
        }

        fetchUsers();
    }, [token]);

    return (
        <div className="admin-controls">
            <label>
                Vælg bruger
                <select
                    value={selectedId ?? ""}
                    onChange={(e) => setSelectedId(Number(e.target.value))}
                >
                    {users.map((u) => (
                        <option key={u.id} value={u.id}>
                            #{u.id} — {u.name} ({u.email}) [{u.role}]
                        </option>
                    ))}
                </select>
            </label>

            <div className="admin-buttons">
                <button
                    type="button"
                    disabled={!selectedId}
                    onClick={() => selectedId && onPromote(selectedId)}
                >
                    Gør til kunstner
                </button>

                <button
                    type="button"
                    disabled={!selectedId}
                    onClick={() => selectedId && onRevoke(selectedId)}
                >
                    Fjern kunstner-rettigheder
                </button>
            </div>

            {error && <p className="login-error">{error}</p>}
            {loadError && <p className="login-error">{loadError}</p>}
        </div>
    );
}
