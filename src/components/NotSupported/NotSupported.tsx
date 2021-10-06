import React from "react";
import clsx from "clsx";

import styles from "./NotSupported.module.scss";

export const NotSupported = ({
  message = "Your browser doesn not support this application.",
}) => {
  return (
    <div className={styles.box}>
      <i className={clsx("pi pi-info-circle", styles.icon)}></i>
      <h3>{message}</h3>
    </div>
  );
};
