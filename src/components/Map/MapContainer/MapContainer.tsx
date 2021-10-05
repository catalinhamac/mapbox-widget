import React from "react";

import { Sidebar } from "../Sidebar/Sidebar";
import { Map } from "../Map";

import styles from "./MapContainer.module.scss";

export const MapContainer = () => 
    <div className={styles.mapContainer}>
      <Sidebar />
      <div className={styles.mapWrapper}>
        <Map />
      </div>
    </div>
  
