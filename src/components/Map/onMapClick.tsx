import mapboxgl from "mapbox-gl";

import {
  clustersLayerId,
  storesSourceId,
  unclusteredPointLayerId,
} from "./Map";
import { createPopup, flyToStore } from "./utils";

export const onMapClick = (map: mapboxgl.Map) => {
  map.on(
    "click",
    clustersLayerId,
    (
      e: mapboxgl.MapMouseEvent & {
        features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
      } & mapboxgl.EventData
    ) => {
      const { point } = e;
      const features = map.queryRenderedFeatures(point, {
        layers: [clustersLayerId],
      });

      if (!features.length) return;

      (map.getSource(storesSourceId) as any).getClusterExpansionZoom(
        features[0].properties?.cluster_id,
        (err: any, zoom: number) => {
          if (err) return;

          map.easeTo({
            center: (features[0].geometry as any).coordinates,
            zoom: zoom,
          });
        }
      );
    }
  );

  map.on(
    "click",
    unclusteredPointLayerId,
    (
      e: mapboxgl.MapMouseEvent & {
        features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
      } & mapboxgl.EventData
    ) => {
      const { point } = e;
      const features = map.queryRenderedFeatures(point, {
        layers: [unclusteredPointLayerId],
      });

      if (!features.length) return;

      const clickedPoint = features[0] as any;

      flyToStore(map, clickedPoint);
      createPopup(map, clickedPoint);
    }
  );
};
