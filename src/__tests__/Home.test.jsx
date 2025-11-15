import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "../screens/Home";
import axiosInstance from "../plugins/interceptor";

vi.mock("../plugins/interceptor");
vi.mock("../components/Loader", () => ({
  default: () => <div>Loading...</div>,
}));

describe("Home Component", () => {
  const mockRoadsterData = {
    launch_date_utc: "2018-02-06T20:45:00.000Z",
    launch_mass_kg: 1350,
    orbit_type: "heliocentric",
    speed_kph: 10000,
    earth_distance_km: 50000000,
    mars_distance_km: 30000000,
    details: "Test details",
    wikipedia: "https://en.wikipedia.org/wiki/Elon_Musk%27s_Tesla_Roadster",
    video: "https://www.youtube.com/watch?v=test",
    flickr_images: ["image1.jpg", "image2.jpg"],
  };

  const mockInfoData = {
    name: "SpaceX",
    founder: "Elon Musk",
    founded: 2002,
    employees: 10000,
    vehicles: 4,
    launch_sites: 3,
    test_sites: 1,
    ceo: "Elon Musk",
    cto: "Elon Musk",
    coo: "Gwynne Shotwell",
    cto_propulsion: "Tom Mueller",
    valuation: 100000000000,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render component with title", () => {
    axiosInstance.get.mockResolvedValue({ data: {} });
    render(<Home />);
    expect(screen.getByText("Space X API App")).toBeDefined();
  });

  it("should show loader while fetching data", () => {
    axiosInstance.get.mockImplementation(() => new Promise(() => {}));
    render(<Home />);
    expect(screen.getByText("Loading...")).toBeDefined();
  });

  it("should fetch and display roadster details", async () => {
    axiosInstance.get.mockImplementation((url) => {
      if (url === "roadster")
        return Promise.resolve({ data: mockRoadsterData });
      if (url === "info") return Promise.resolve({ data: mockInfoData });
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("Elon Musk's Tesla Roadster")).toBeDefined();
      expect(screen.getByText("Test details")).toBeDefined();
    });
  });

  it("should fetch and display info in drawer", async () => {
    axiosInstance.get.mockImplementation((url) => {
      if (url === "roadster")
        return Promise.resolve({ data: mockRoadsterData });
      if (url === "info") return Promise.resolve({ data: mockInfoData });
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("SpaceX")).toBeDefined();
      expect(screen.getByText("Elon Musk")).toBeDefined();
    });
  });

  it("should handle error when fetching roadster details", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    axiosInstance.get.mockImplementation((url) => {
      if (url === "roadster") return Promise.reject(new Error("Network error"));
      if (url === "info") return Promise.resolve({ data: mockInfoData });
    });

    render(<Home />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error fetching roadster details:",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it("should handle error when fetching info", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    axiosInstance.get.mockImplementation((url) => {
      if (url === "roadster")
        return Promise.resolve({ data: mockRoadsterData });
      if (url === "info") return Promise.reject(new Error("Network error"));
    });

    render(<Home />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error fetching info:",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it("should render images from flickr_images", async () => {
    axiosInstance.get.mockImplementation((url) => {
      if (url === "roadster")
        return Promise.resolve({ data: mockRoadsterData });
      if (url === "info") return Promise.resolve({ data: mockInfoData });
    });

    render(<Home />);

    await waitFor(() => {
      const images = screen.getAllByAltText("Roadster");
      expect(images).toHaveLength(2);
    });
  });
});
