import React from "react";
import mapboxgl from "mapbox-gl";

import { Sidebar } from "../Sidebar/Sidebar";
import { Map } from "../Map";
import { NotSupported } from "../../NotSupported/NotSupported";

import styles from "./MapContainer.module.scss";

export const MapContainer = () => {
  if (!mapboxgl.supported()) {
    return <NotSupported message="Your browser does not support Mapbox GL" />;
  }

  return (
    <div className={styles.mapContainer}>
      <Sidebar />
      <div className={styles.mapWrapper}>
        <Map />
      </div>
    </div>
  );
};
