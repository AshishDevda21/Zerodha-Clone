import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RightSection from "../landing_page/signup/RightSection";
import axios from "axios";

jest.mock("axios");
jest.mock("sweetalert2", () => ({
  fire: jest.fn(() => Promise.resolve({ isConfirmed: false })),
}));

describe("Login Form Validation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows required field validation classes on empty submit", () => {
    render(<RightSection />);

    const form = document.querySelector("form");
    fireEvent.submit(form);

    expect(form).toHaveClass("was-validated");
    expect(axios.post).not.toHaveBeenCalled();
  });

  test("does not submit with invalid email format", async () => {
    render(<RightSection />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "secret123" },
    });

    const form = document.querySelector("form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(form).toHaveClass("was-validated");
      expect(axios.post).not.toHaveBeenCalled();
    });
  });

  test("does not submit when password is missing", async () => {
    render(<RightSection />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@example.com" },
    });

    const form = document.querySelector("form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(axios.post).not.toHaveBeenCalled();
    });
  });
});
