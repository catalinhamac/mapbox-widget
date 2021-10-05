import React, { useState } from "react";
import mapboxgl from "mapbox-gl";

import { Sidebar } from "../Sidebar/Sidebar";
import { Map } from "../Map";

import styles from "./MapContainer.module.scss";

export const MapContainer = () => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  const dispatchMap = (map: mapboxgl.Map) => {
    setMap(map);
  };

  return (
    <div className={styles.mapContainer}>
      <Sidebar map={map as mapboxgl.Map} />
      <div className={styles.mapWrapper}>
        <Map dispatchMap={dispatchMap} />
      </div>
    </div>
  );
};
