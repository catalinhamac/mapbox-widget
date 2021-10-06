import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import {
  clustersLayerId,
  initialCoordinates,
  mapboxglConfig,
  unclusteredPointLayerId,
} from "./config";
import { onMapLoad } from "./onMapLoad";
import { onMapClick } from "./onMapClick";
import { useAppDispatch } from "../../redux/hooks";
import { setMap } from "../../redux/map/map-slice";

import styles from "./Map.module.scss";

export const Map = () => {
  const containerMap = useRef<mapboxgl.Map | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!containerMap) return;

    const map = new mapboxgl.Map({
      ...mapboxglConfig,
      container: containerMap.current as any,
      center: new mapboxgl.LngLat(
        initialCoordinates.lng,
        initialCoordinates.lat
      ),
      zoom: 3,
      //scrollZoom: false,
    });

    dispatch(setMap(map));

    onMapLoad(map);
    onMapClick(map);

    map.on("mouseenter", clustersLayerId, () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", clustersLayerId, () => {
      map.getCanvas().style.cursor = "";
    });

    map.on("mouseenter", unclusteredPointLayerId, (e) => {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", unclusteredPointLayerId, () => {
      map.getCanvas().style.cursor = "";
    });

    map.addControl(
      new mapboxgl.NavigationControl({
        showCompass: true,
        showZoom: true,
      }),
      "top-right"
    );

    map.addControl(new mapboxgl.FullscreenControl(), "bottom-right");

    return () => {
      map.remove();
    };
    // eslint-disable-next-line
  }, []);

  return <div className={styles.map} ref={containerMap as any} />;
};
