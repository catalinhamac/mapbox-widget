import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import { pois } from "../../data/pois";
import { IPoi } from "./models/Poi";
import { setStoresSource } from "./utils";
import { mapboxglConfig } from "./config";
import { ISource } from "./models/Source";
import { onMapLoad } from "./onMapLoad";
import { onMapClick } from "./onMapClick";
import { useAppDispatch } from "../../redux/hooks";
import { setMap } from "../../redux/map/map-slice";

import styles from "./Map.module.scss";

export const initialCoordinates = { lat: 32.7492156, lng: -117.0698575 };
export const storesSourceId = "storesSourceId";
export const clustersLayerId = "clustersLayerId";
export const clusterCountLayerId = "clusterCountLayerId";
export const unclusteredPointLayerId = "unclusteredPointLayerId";

export const Map = () => {
  const containerMap = useRef<mapboxgl.Map | null>(null);
  const sourceRef = useRef<ISource>(setStoresSource(pois as IPoi[]));
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

    onMapLoad(map, sourceRef.current);
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
