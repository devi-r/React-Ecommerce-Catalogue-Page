import React from "react";
import Skeleton from "./Skeleton";
import styles from "../../storefront.module.scss";

const TopControlsSkeleton = () => {
  return (
    <div className={styles.topWrapper}>
      <div className={styles.sortWrapper}>
        <Skeleton width="120px" height="32px" />
      </div>
    </div>
  );
};

export default TopControlsSkeleton;
