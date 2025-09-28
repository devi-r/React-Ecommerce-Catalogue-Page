import React from "react";
import styles from "./skeleton.module.scss";

const Skeleton = ({
  width = "100%",
  height = "20px",
  borderRadius = "4px",
  className = "",
  animation = "pulse",
  style = {},
}) => {
  return (
    <div
      className={`${styles.skeleton} ${styles[animation]} ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    />
  );
};

export default Skeleton;
