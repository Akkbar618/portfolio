import { vi } from "vitest";

Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  value: vi.fn(() => ({
    clearRect: vi.fn(),
    fillText: vi.fn(),
    font: "",
    textAlign: "center",
    textBaseline: "middle",
    fillStyle: "#000",
  })),
});

Object.defineProperty(HTMLCanvasElement.prototype, "toDataURL", {
  value: vi.fn(() => "data:image/png;base64,"),
});

if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}
