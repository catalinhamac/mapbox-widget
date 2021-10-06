import mapboxgl from "mapbox-gl";

import {
  catchmentAreaLayerId,
  catchmentAreaSourceId,
  clusterCountLayerId,
  clustersLayerId,
  footprintSourceId,
  unclusteredPointLayerId,
} from "./config";
import { setStoresSource, SourceType } from "./utils";
import { pois } from "../../data/pois";
import { IPoi } from "./models/Poi";

const footprintStoresSource = setStoresSource(pois as IPoi[]);
const catchmentAreaStoresSource = setStoresSource(
  pois as IPoi[],
  SourceType.CatchmentArea
);

export const onMapLoad = (map: mapboxgl.Map) => {
  map.on("load", () => {
    map.addSource(catchmentAreaSourceId, {
      type: "geojson",
      data: catchmentAreaStoresSource as any,
    });

    map.addLayer({
      id: catchmentAreaLayerId,
      type: "fill-extrusion",
      source: catchmentAreaSourceId,
      paint: {
        "fill-extrusion-color": "grey",
        "fill-extrusion-opacity": 0.1,
      },
    });
    map.addSource(footprintSourceId, {
      type: "geojson",
      data: footprintStoresSource as any,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
    });

    map.addLayer({
      id: clustersLayerId,
      type: "circle",
      source: footprintSourceId,
      filter: ["has", "point_count"],
      paint: {
        "circle-color": [
          "step",
          ["get", "point_count"],
          "white",
          100,
          "#f1f075",
          750,
          "#f28cb1",
        ],
        "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
        "circle-stroke-width": 3,
        "circle-stroke-color": "#00b4d3",
      },
    });

    map.addLayer({
      id: clusterCountLayerId,
      type: "symbol",
      source: footprintSourceId,
      filter: ["has", "point_count"],
      layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12,
      },
    });

    map.addLayer({
      id: unclusteredPointLayerId,
      type: "circle",
      source: footprintSourceId,
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": "white",
        "circle-radius": 6,
        "circle-stroke-width": 3,
        "circle-stroke-color": "#00b4d3",
      },
    });
  });
};
