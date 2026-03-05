import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LeftSection from "../landing_page/signup/LeftSection";
import axios from "axios";
import Swal from "sweetalert2";

jest.mock("axios");
jest.mock("sweetalert2", () => ({
  fire: jest.fn(() => Promise.resolve({ isConfirmed: false })),
}));

describe("Signup API Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("handles successful user registration response", async () => {
    axios.post.mockResolvedValueOnce({
      data: { token: "signup-token", user: { username: "alice" } },
    });

    render(<LeftSection />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "alice" },
    });
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: "alice@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "secure123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /signup/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("http://localhost:3002/signup", {
        username: "alice",
        email: "alice@example.com",
        password: "secure123",
      });
    });

    expect(localStorage.getItem("token")).toBe("signup-token");
    expect(localStorage.getItem("userId")).toBe("alice");
    expect(Swal.fire).toHaveBeenCalled();
  });

  test("handles failure response for duplicate email or missing fields", async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { msg: "Email already exists" } },
    });

    render(<LeftSection />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "bob" },
    });
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: "bob@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "secure123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /signup/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: "error",
        title: "Signup Failed",
        text: "Email already exists",
      })
    );
  });
});
