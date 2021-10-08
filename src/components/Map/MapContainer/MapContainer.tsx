import React from "react";

import mapboxgl from "../../Lib";
import { Sidebar } from "../Sidebar/Sidebar";
import { Map } from "../Map";
import { NotSupported } from "../../NotSupported/NotSupported";
import { onMapClick } from "../onMapClick";

import styles from "./MapContainer.module.scss";

export const testId = "mapContainerTestId";
export const unsupportedMessage = "Your browser does not support Mapbox GL";

export const MapContainer = () => {
  if (!mapboxgl.supported()) {
    return <NotSupported message={unsupportedMessage} />;
  }

  return (
    <div className={styles.mapContainer} data-testid={testId}>
      <Sidebar />
      <div className={styles.mapWrapper}>
        <Map container="" onMapClick={onMapClick} />
      </div>
    </div>
  );
};
