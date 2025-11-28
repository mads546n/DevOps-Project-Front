import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PromoteArtMock from "./PromoteArtMock";

describe("Use Case #16: Promote My Art", () => {
    //precondition!
  const setup = () =>
    render(
      <MemoryRouter initialEntries={["/Artist/123"]}>
        <Routes>
          <Route path="/Artist/:artistID" element={<PromoteArtMock />} />
        </Routes>
      </MemoryRouter>
    );

//event
  it("lets a verified artist select auctions to promote (basic flow)", () => {
    setup();

    fireEvent.click(screen.getByTestId("my-auctions-tab"));
    fireEvent.click(screen.getByTestId("partner-program-btn"));

    fireEvent.click(screen.getByTestId("checkbox-Sunset"));
    fireEvent.click(screen.getByTestId("checkbox-Dreamscape"));

    fireEvent.click(screen.getByTestId("confirm-btn"));

    expect(screen.getByTestId("success-message")).toBeInTheDocument();
  });

//alternative flow event
  it("alternative flow: artist subscribes (auto-promote all)", () => {
    setup();

    fireEvent.click(screen.getByTestId("my-auctions-tab"));
    fireEvent.click(screen.getByTestId("partner-program-btn"));

    fireEvent.click(screen.getByTestId("subscribe-btn"));
    fireEvent.click(screen.getByTestId("confirm-btn"));

    expect(screen.getByTestId("success-message")).toBeInTheDocument();
  });

//end state
  it("blocks non-artist users", () => {
    render(
      <MemoryRouter initialEntries={["/Artist"]}>
        <Routes>
          <Route path="/Artist" element={<PromoteArtMock />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/not a verified artist/i)
    ).toBeInTheDocument();
  });
});
