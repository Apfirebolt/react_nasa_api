import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Dragons from "../screens/Dragons";

vi.mock("../components/Loader", () => ({
  default: () => <div>Loading...</div>,
}));

const mockDragonData = [
  {
    id: "1",
    name: "Dragon 1",
    description: "Test dragon description",
    type: "capsule",
    first_flight: "2010-12-08",
    crew_capacity: 7,
    heat_shield: { material: "PICA-X" },
    thrusters: [{ type: "Draco" }],
    launch_payload_mass: { kg: 6000 },
    return_payload_mass: { kg: 3000 },
    height_w_trunk: { meters: 7.2 },
    diameter: { meters: 3.7 },
    wikipedia: "https://en.wikipedia.org/wiki/Dragon_1",
  },
];

const createMockStore = (initialState) => {
  return configureStore({
    reducer: {
      dragonData: () => initialState,
    },
  });
};

describe("Dragons Component", () => {
  it("should display loader when isLoading is true", () => {
    const store = createMockStore({ dragonList: [], isLoading: true });
    render(
      <Provider store={store}>
        <Dragons />
      </Provider>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render dragon list when data is loaded", () => {
    const store = createMockStore({
      dragonList: mockDragonData,
      isLoading: false,
    });
    render(
      <Provider store={store}>
        <Dragons />
      </Provider>
    );
    expect(screen.getByText("Dragons")).toBeInTheDocument();
    expect(screen.getByText("Dragon 1")).toBeInTheDocument();
  });

  it('should display "No description available" when description is missing', () => {
    const dragonWithoutDescription = [
      { ...mockDragonData[0], description: null },
    ];
    const store = createMockStore({
      dragonList: dragonWithoutDescription,
      isLoading: false,
    });
    render(
      <Provider store={store}>
        <Dragons />
      </Provider>
    );
    expect(screen.getByText(/No description available/)).toBeInTheDocument();
  });

  it("should render all dragon details correctly", () => {
    const store = createMockStore({
      dragonList: mockDragonData,
      isLoading: false,
    });
    render(
      <Provider store={store}>
        <Dragons />
      </Provider>
    );
    expect(screen.getByText(/Type: capsule/)).toBeInTheDocument();
    expect(screen.getByText(/First Flight: 2010-12-08/)).toBeInTheDocument();
    expect(screen.getByText(/Crew Capacity: 7/)).toBeInTheDocument();
    expect(
      screen.getByText(/Heat Shield Material: PICA-X/)
    ).toBeInTheDocument();
  });

  it("should render wikipedia link with correct attributes", () => {
    const store = createMockStore({
      dragonList: mockDragonData,
      isLoading: false,
    });
    render(
      <Provider store={store}>
        <Dragons />
      </Provider>
    );
    const link = screen.getByRole("link", { name: "Wikipedia" });
    expect(link).toHaveAttribute(
      "href",
      "https://en.wikipedia.org/wiki/Dragon_1"
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should render multiple dragons", () => {
    const multipleDragons = [
      mockDragonData[0],
      { ...mockDragonData[0], id: "2", name: "Dragon 2" },
    ];
    const store = createMockStore({
      dragonList: multipleDragons,
      isLoading: false,
    });
    render(
      <Provider store={store}>
        <Dragons />
      </Provider>
    );
    expect(screen.getByText("Dragon 1")).toBeInTheDocument();
    expect(screen.getByText("Dragon 2")).toBeInTheDocument();
  });

  it("should render empty list when dragonList is empty", () => {
    const store = createMockStore({ dragonList: [], isLoading: false });
    render(
      <Provider store={store}>
        <Dragons />
      </Provider>
    );
    expect(screen.getByText("Dragons")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
