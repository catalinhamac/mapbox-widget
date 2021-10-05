import React from "react";
import clsx from "clsx";

import { IFeature } from "../models/Source";

import styles from "./Popup.module.scss";

export enum PopupSize {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
}

type Size = "Small" | "Medium" | "Large";

interface IProps {
  feature: IFeature;
  size?: Size;
}

export const Popup = ({ feature, size = PopupSize.Small }: IProps) => {
  const {
    properties: { name, address, avatar },
  } = feature;

  return (
    <div
      className={clsx({
        [styles.popup]: true,
        [styles[PopupSize[size]]]: true,
      })}
    >
      {avatar && <img src={avatar} alt="avatar" />}
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <h4 className={styles.desc}>{address}</h4>
      </div>
    </div>
  );
};
