// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import mapboxgl from "./components/Lib";
import {
  MapMock,
  LngLatMock,
  NavigationControlMock,
  FullscreenControlMock,
} from "./mocks/MapMock";

jest.mock("mapbox-gl/dist/mapbox-gl", () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
  })),
  NavigationControl: jest.fn(),
}));

beforeEach(() => {
  /* eslint-disable no-undef */
  mapboxgl.Map = MapMock;
  mapboxgl.LngLat = LngLatMock;
  mapboxgl.NavigationControl = NavigationControlMock;
  mapboxgl.FullscreenControl = FullscreenControlMock;

  mapboxgl.supported = jest.fn().mockReturnValue(true);
  /* eslint-enable no-undef */
});

afterEach(() => {
  delete mapboxgl.Map;
  delete mapboxgl.LngLat;
  delete mapboxgl.NavigationControl;
  delete mapboxgl.FullscreenControl;
  delete mapboxgl.supported;
});
