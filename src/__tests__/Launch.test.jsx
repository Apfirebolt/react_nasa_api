import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Launch from "../screens/Launch";
import { getLaunchData } from "../features/launch/launchSlice";

vi.mock("../features/launch/launchSlice", () => ({
  getLaunchData: vi.fn(),
}));

vi.mock("../components/LaunchCard", () => ({
  default: ({ launch }) => <div data-testid="launch-card">{launch.name}</div>,
}));

vi.mock("../components/Loader", () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

const createMockStore = (initialState) => {
  return configureStore({
    reducer: {
      launchData: (state = initialState) => state,
    },
  });
};

describe("Launch Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render loader when isLoading is true", () => {
    const store = createMockStore({ launchList: [], isLoading: true });
    render(
      <Provider store={store}>
        <Launch />
      </Provider>
    );
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("should dispatch getLaunchData on mount", () => {
    const store = createMockStore({ launchList: [], isLoading: false });
    render(
      <Provider store={store}>
        <Launch />
      </Provider>
    );
    expect(getLaunchData).toHaveBeenCalledTimes(1);
  });

  it("should render launch cards when data is available", () => {
    const mockLaunches = [
      { name: "Launch 1" },
      { name: "Launch 2" },
      { name: "Launch 3" },
    ];
    const store = createMockStore({
      launchList: mockLaunches,
      isLoading: false,
    });
    render(
      <Provider store={store}>
        <Launch />
      </Provider>
    );
    const launchCards = screen.getAllByTestId("launch-card");
    expect(launchCards).toHaveLength(3);
  });

  it("should render empty grid when launchList is empty", () => {
    const store = createMockStore({ launchList: [], isLoading: false });
    const { container } = render(
      <Provider store={store}>
        <Launch />
      </Provider>
    );
    const launchCards = container.querySelectorAll(
      '[data-testid="launch-card"]'
    );
    expect(launchCards).toHaveLength(0);
  });

  it("should render with correct padding and margin styles", () => {
    const store = createMockStore({ launchList: [], isLoading: false });
    const { container } = render(
      <Provider store={store}>
        <Launch />
      </Provider>
    );
    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveStyle({ padding: "16px", margin: "16px" });
  });
});
