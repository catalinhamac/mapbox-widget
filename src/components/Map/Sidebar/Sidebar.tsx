import React, { useRef, useState } from "react";
import clsx from "clsx";

import { IPoi } from "../models/Poi";
import { IFeature, ISource } from "../models/Source";
import { pois } from "../../../data/pois";
import { createPopup, flyToStore, setStoresSource } from "../utils";

import styles from "./Sidebar.module.scss";
import mapboxgl from "mapbox-gl";

interface IProps {
  map: mapboxgl.Map
}

export const Sidebar = ({ map }: IProps) => {
  const poisRef = useRef<ISource>(setStoresSource(pois as IPoi[]));
  const [itemId, setItemId] = useState<number | undefined>();

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
      {<h2>Stores</h2>}
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
              <button
                type="button"
                className={styles.title}
                id={`link-${id}`}
                onClick={handleClick(id as number)}
              >
                {address}
              </button>
              <div>{city}</div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};
