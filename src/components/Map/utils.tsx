import React from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";

import { IPoi } from "./models/Poi";
import { Popup } from "./Popup/Popup";
import { IFeature, ISource } from "./models/Source";

export const setStoresSource = (pois: IPoi[]): ISource => {
  const copy = [...pois];

  const features = copy.map(({ footprint, ...rest }: IPoi, index: number) => ({
    id: index,
    type: "Feature",
    geometry: {type: "Point", coordinates: JSON.parse(footprint).coordinates[0][0]},
    properties: { ...rest },
  }));

  return {
    type: "FeatureCollection",
    features,
  } as ISource;
};

export const flyToStore = (map: mapboxgl.Map, feature: IFeature) => {
  map.flyTo({
    center: (feature.geometry as any).coordinates,
    zoom: 15,
  });
};

export const createPopup = (map: mapboxgl.Map, feature: any) => {
  const popups = document.getElementsByClassName("mapboxgl-popup");

  if (popups[0]) popups[0].remove();

  const tooltipNode = document.createElement("div");
  ReactDOM.render(<Popup feature={feature} />, tooltipNode);

  new mapboxgl.Popup({ offset: 15, closeButton: false })
    .setLngLat(feature.geometry.coordinates)
    .setDOMContent(tooltipNode)
    .addTo(map);
};
