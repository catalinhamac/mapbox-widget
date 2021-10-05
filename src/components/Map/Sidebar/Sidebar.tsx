import React, { useRef, useState } from "react";
import clsx from "clsx";

import { IPoi } from "../models/Poi";
import { IFeature, ISource } from "../models/Source";
import { pois } from "../../../data/pois";
import { createPopup, flyToStore, setStoresSource } from "../utils";
import { useMap } from "../useMap";

import styles from "./Sidebar.module.scss";
import mapboxgl from "mapbox-gl";

export const Sidebar = () => {
  const poisRef = useRef<ISource>(setStoresSource(pois as IPoi[]));
  const [itemId, setItemId] = useState<number | undefined>();
  const map = useMap() as mapboxgl.Map;

  const handleClick = (id: number) => () => {
    poisRef.current.features.forEach((feature: IFeature) => {
      if (feature.id === id) {
        flyToStore(map, feature);
        createPopup(map, feature);
        setItemId(id as number);
      }
    });
  };

  return (
    <div className={styles.sidebar}>
      {<h2 className={styles.title}>Stores</h2>}
      <ul className={styles.listings}>
        {poisRef.current.features.map(
          ({ id, properties: { address, city } }: IFeature) => (
            <li
              key={id}
              id={`listing-${id}`}
              className={clsx({
                [styles.item]: true,
                [styles.active]: id === itemId,
              })}
            >
              <i className={clsx("pi pi-home", styles.icon)}></i>
              <span>
              <button
                type="button"
                className={styles.itemTitle}
                id={`link-${id}`}
                onClick={handleClick(id as number)}
              >
                {address}
              </button>
              <p className={styles.text}>{city}</p>
              </span>
            </li>
          )
        )}
      </ul>
    </div>
  );
};
