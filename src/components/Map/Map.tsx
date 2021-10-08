import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import {
  clustersLayerId,
  initialCoordinates,
  mapboxglConfig,
  unclusteredPointLayerId,
} from "./config";
import { onMapLoad } from "./onMapLoad";
import { useAppDispatch } from "../../redux/hooks";
import { setMap } from "../../redux/map/map-slice";

import styles from "./Map.module.scss";

export const testId = "mapTestId";

interface OwnProps {
  onMapClick?: (map: mapboxgl.Map) => void;
}

type IProps = OwnProps & (mapboxgl.MapboxOptions | undefined);

export const Map = (props: IProps) => {
  const { onMapClick = () => {}, ...rest } = props;
  const containerMap = useRef<mapboxgl.Map | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!containerMap.current) return;

    const map = new mapboxgl.Map({
      ...mapboxglConfig,
      center: new mapboxgl.LngLat(
        initialCoordinates.lng,
        initialCoordinates.lat
      ),
      zoom: 3,
      ...rest,
      container: containerMap.current as any,
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

  return (
    <div
      className={styles.map}
      ref={containerMap as any}
      data-testid={testId}
    />
  );
};
