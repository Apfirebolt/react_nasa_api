import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Payloads from "../screens/Payloads";

vi.mock("../components/Loader", () => ({
  default: () => <div>Loading...</div>,
}));

const mockPayloads = [
  {
    payload_id: "payload-1",
    details: "Test payload details",
    payload_type: "Satellite",
    orbit: "LEO",
    nationality: "USA",
    manufacturer: "SpaceX",
  },
  {
    payload_id: "payload-2",
    details: null,
    payload_type: "Dragon",
    orbit: "ISS",
    nationality: "USA",
    manufacturer: "SpaceX",
  },
];

describe("Payloads Component", () => {
  it("should display loader when isLoading is true", () => {
    const store = configureStore({
      reducer: { payloadData: () => ({ payloadList: [], isLoading: true }) },
    });

    render(
      <Provider store={store}>
        <Payloads />
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render payload list when data is loaded", () => {
    const store = configureStore({
      reducer: {
        payloadData: () => ({ payloadList: mockPayloads, isLoading: false }),
      },
    });

    render(
      <Provider store={store}>
        <Payloads />
      </Provider>
    );

    expect(screen.getByText("Payloads")).toBeInTheDocument();
    expect(screen.getByText("payload-1")).toBeInTheDocument();
    expect(screen.getByText("payload-2")).toBeInTheDocument();
  });

  it('should display "No details available" when details are null', () => {
    const store = configureStore({
      reducer: {
        payloadData: () => ({ payloadList: mockPayloads, isLoading: false }),
      },
    });

    render(
      <Provider store={store}>
        <Payloads />
      </Provider>
    );

    expect(screen.getByText(/No details available/i)).toBeInTheDocument();
  });

  it("should render correct number of cards", () => {
    const store = configureStore({
      reducer: {
        payloadData: () => ({ payloadList: mockPayloads, isLoading: false }),
      },
    });

    const { container } = render(
      <Provider store={store}>
        <Payloads />
      </Provider>
    );

    const cards = container.querySelectorAll(".ant-card");
    expect(cards).toHaveLength(2);
  });
});
