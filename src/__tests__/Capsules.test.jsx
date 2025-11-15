import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Capsule from "../screens/Capsules";

vi.mock("../components/Loader", () => ({
  default: () => <div>Loading...</div>,
}));

const mockCapsuleData = [
  {
    capsule_serial: "C101",
    details: "Test capsule details",
    status: "active",
    type: "Dragon 1.1",
    original_launch: "2010-12-08",
    missions: [{ name: "Mission 1" }],
  },
  {
    capsule_serial: "C102",
    details: null,
    status: "retired",
    type: "Dragon 2.0",
    original_launch: "2015-05-20",
    missions: [],
  },
];

const createMockStore = (initialState) => {
  return configureStore({
    reducer: {
      capsuleData: () => initialState,
    },
  });
};

describe("Capsule Component", () => {
  it("should render loader when isLoading is true", () => {
    const store = createMockStore({ capsuleList: [], isLoading: true });
    render(
      <Provider store={store}>
        <Capsule />
      </Provider>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render capsule list when data is loaded", () => {
    const store = createMockStore({
      capsuleList: mockCapsuleData,
      isLoading: false,
    });
    render(
      <Provider store={store}>
        <Capsule />
      </Provider>
    );
    expect(screen.getByText("Capsules")).toBeInTheDocument();
    expect(screen.getByText("C101")).toBeInTheDocument();
    expect(screen.getByText("C102")).toBeInTheDocument();
  });

  it('should display "No details available" when capsule details are null', () => {
    const store = createMockStore({
      capsuleList: mockCapsuleData,
      isLoading: false,
    });
    render(
      <Provider store={store}>
        <Capsule />
      </Provider>
    );
    expect(screen.getByText(/No details available/i)).toBeInTheDocument();
  });

  it("should render capsule details correctly", () => {
    const store = createMockStore({
      capsuleList: mockCapsuleData,
      isLoading: false,
    });
    render(
      <Provider store={store}>
        <Capsule />
      </Provider>
    );
    expect(screen.getByText(/Test capsule details/i)).toBeInTheDocument();
    expect(screen.getByText(/Status: active/i)).toBeInTheDocument();
    expect(screen.getByText(/Type: Dragon 1.1/i)).toBeInTheDocument();
  });

  it("should render correct number of missions", () => {
    const store = createMockStore({
      capsuleList: mockCapsuleData,
      isLoading: false,
    });
    render(
      <Provider store={store}>
        <Capsule />
      </Provider>
    );
    expect(screen.getByText(/Missions: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Missions: 0/i)).toBeInTheDocument();
  });

  it("should render empty list when capsuleList is empty", () => {
    const store = createMockStore({ capsuleList: [], isLoading: false });
    render(
      <Provider store={store}>
        <Capsule />
      </Provider>
    );
    expect(screen.getByText("Capsules")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
