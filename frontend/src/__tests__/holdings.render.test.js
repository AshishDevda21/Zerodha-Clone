import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Holdings from "../dashboard/components/Holdings";
import API from "../dashboard/components/api";

jest.mock("../dashboard/components/api", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

jest.mock("../dashboard/components/VerticalGraph", () => ({
  VerticalGraph: () => <div data-testid="vertical-graph" />,
}));

describe("Holdings Component Render", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders holdings table and loads rows after API fetch", async () => {
    API.get.mockResolvedValueOnce({
      data: [
        {
          name: "INFY",
          qty: 10,
          avg: 1200,
          price: 1400,
          net: "+5%",
          day: "+1%",
          isLoss: false,
        },
        {
          name: "TCS",
          qty: 5,
          avg: 3000,
          price: 2900,
          net: "-2%",
          day: "-0.5%",
          isLoss: true,
        },
      ],
    });

    render(<Holdings />);

    expect(await screen.findByText(/Holdings \(2\)/i)).toBeInTheDocument();
    expect(screen.getByText("INFY")).toBeInTheDocument();
    expect(screen.getByText("TCS")).toBeInTheDocument();

    const rows = document.querySelectorAll("table tr");
    expect(rows.length).toBe(3);
    expect(API.get).toHaveBeenCalledWith("http://localhost:3002/allHoldings");
  });
});
