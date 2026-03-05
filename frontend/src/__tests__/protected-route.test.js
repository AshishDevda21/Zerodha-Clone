import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock(
  "react-router-dom",
  () => ({
    Navigate: ({ to }) => <div>Redirected to {to}</div>,
  }),
  { virtual: true }
);

import ProtectedRoute from "../dashboard/components/ProtectedRoute";

describe("ProtectedRoute", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("redirects unauthenticated user to login page", async () => {
    render(
      <ProtectedRoute>
        <div>Dashboard Content</div>
      </ProtectedRoute>
    );
    expect(await screen.findByText("Redirected to /signup")).toBeInTheDocument();
    expect(screen.queryByText("Dashboard Content")).not.toBeInTheDocument();
  });

  test("allows route access after authentication token is present", async () => {
    localStorage.setItem("token", "mock-auth-token");
    render(
      <ProtectedRoute>
        <div>Dashboard Content</div>
      </ProtectedRoute>
    );
    expect(await screen.findByText("Dashboard Content")).toBeInTheDocument();
    expect(screen.queryByText("Redirected to /signup")).not.toBeInTheDocument();
  });
});
