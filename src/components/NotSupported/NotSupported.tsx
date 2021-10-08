import React from "react";
import clsx from "clsx";

import styles from "./NotSupported.module.scss";

export const testId = "notSupportedTestId";
export const defaultMessage =
  "Your browser doesn not support this application.";

export const NotSupported = ({ message = defaultMessage }) => (
  <div className={styles.box} data-testid={testId}>
    <i className={clsx("pi pi-info-circle", styles.icon)}></i>
    <h3>{message}</h3>
  </div>
);
