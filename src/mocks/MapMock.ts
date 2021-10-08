export class MapMock {
  on = jest.fn();

  addControl = jest.fn();

  addLayer = jest.fn();

  easeTo = jest.fn();

  flyTo = jest.fn();

  getCenter = jest.fn().mockReturnValue({ lat: 20, lng: 20 });

  jumpTo = jest.fn();

  setCenter = jest.fn();

  getZoom = jest.fn().mockReturnValue(15);

  setZoom = jest.fn();

  setMinZoom = jest.fn();

  setMaxZoom = jest.fn();

  setStyle = jest.fn();

  remove = jest.fn();
}

export class FullscreenControlMock {}

export class NavigationControlMock {}

export class LngLatMock {}
