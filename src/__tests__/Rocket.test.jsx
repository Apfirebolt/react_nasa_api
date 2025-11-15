import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Rockets from "../screens/Rocket";

vi.mock("../components/Loader", () => ({
  default: () => <div>Loading...</div>,
}));

const mockRocketData = [
  {
    rocket_id: "1",
    rocket_name: "Falcon 1",
    description: "First orbital rocket",
    rocket_type: "Merlin A",
    first_flight: "2006-03-24",
    country: "USA",
    company: "SpaceX",
  },
  {
    rocket_id: "2",
    rocket_name: "Falcon 9",
    description: null,
    rocket_type: "Merlin 1D",
    first_flight: "2010-06-04",
    country: "USA",
    company: "SpaceX",
  },
];

const createMockStore = (initialState) => {
  return configureStore({
    reducer: {
      rocketData: () => initialState,
    },
  });
};

describe("Rockets Component", () => {
  it("should render loader when isLoading is true", () => {
    const store = createMockStore({ rocketList: [], isLoading: true });
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render rockets list when data is loaded", () => {
    const store = createMockStore({
      rocketList: mockRocketData,
      isLoading: false,
    });
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>
    );
    expect(screen.getByText("Rockets")).toBeInTheDocument();
    expect(screen.getByText("Falcon 1")).toBeInTheDocument();
    expect(screen.getByText("Falcon 9")).toBeInTheDocument();
  });

  it('should display "No description available" when description is null', () => {
    const store = createMockStore({
      rocketList: mockRocketData,
      isLoading: false,
    });
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>
    );
    expect(screen.getByText("No description available")).toBeInTheDocument();
  });

  it("should render all rocket details correctly", () => {
    const store = createMockStore({
      rocketList: [mockRocketData[0]],
      isLoading: false,
    });
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>
    );
    expect(screen.getByText(/First orbital rocket/i)).toBeInTheDocument();
    expect(screen.getByText(/Type: Merlin A/i)).toBeInTheDocument();
    expect(screen.getByText(/First Flight: 2006-03-24/i)).toBeInTheDocument();
    expect(screen.getByText(/Country: USA/i)).toBeInTheDocument();
    expect(screen.getByText(/Company: SpaceX/i)).toBeInTheDocument();
  });

  it("should render empty list when rocketList is empty", () => {
    const store = createMockStore({ rocketList: [], isLoading: false });
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>
    );
    expect(screen.getByText("Rockets")).toBeInTheDocument();
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });

  it("should render correct number of rocket cards", () => {
    const store = createMockStore({
      rocketList: mockRocketData,
      isLoading: false,
    });
    const { container } = render(
      <Provider store={store}>
        <Rockets />
      </Provider>
    );
    const cards = container.querySelectorAll(".ant-card");
    expect(cards.length).toBe(2);
  });
});
