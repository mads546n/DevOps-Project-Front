// src/tests/AppRouter.HomePage.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { DeviceProvider } from "../state/provider/DeviceProvider";
import AppRouter from "../components/AppRouter";

function renderWithProviders(initialEntries: string[]) {
    const queryClient = new QueryClient();

    return render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter initialEntries={initialEntries}>
                <DeviceProvider>
                    <AppRouter />
                </DeviceProvider>
            </MemoryRouter>
        </QueryClientProvider>
    );
}

describe("Routing to homepage", () => {
    it("renders the homepage when route is '/' (Usecase #1)", () => {
        renderWithProviders(["/"]);

        // Fælles indhold
        expect(screen.getByText(/Nyeste auktioner/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Sådan fungerer vores auktioner/i)
        ).toBeInTheDocument();

        // Forsiden viser kunstnernavnet i homepage-varianten
        expect(
            screen.getByText(/Karl Larhenhaus/i)
        ).toBeInTheDocument();

        // …og IKKE auktion-sidens variant
        expect(
            screen.queryByText(/KarlpP Larhenhaus/i)
        ).toBeNull();
    });

    it("renders the auction page when route is '/auktioner' (Usecase #2)", () => {
        renderWithProviders(["/auktioner"]);

        // Stadig fælles indhold
        expect(screen.getByText(/Nyeste auktioner/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Sådan fungerer vores auktioner/i)
        ).toBeInTheDocument();

        // Auktionssiden viser den anden form af navnet
        expect(
            screen.getByText(/KarlpP Larhenhaus/i)
        ).toBeInTheDocument();

        // …og ikke homepage-varianten
        expect(
            screen.queryByText(/Karl Larhenhaus(?!p)/i)
        ).toBeNull();
    });
});
