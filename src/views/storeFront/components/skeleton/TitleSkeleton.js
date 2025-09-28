import React from "react";
import Skeleton from "./Skeleton";
import styles from "../../storefront.module.scss";

const TitleSkeleton = () => {
  return (
    <div className={styles.titleWrapper}>
      <div className={styles.title}>
        <Skeleton
          width="100px"
          height="20px"
          className={styles.text}
          style={{ marginRight: "10px" }}
        />
        <Skeleton width="80px" height="20px" className={styles.totalCount} />
      </div>
      <Skeleton width="60px" height="32px" className={styles.filterButton} />
    </div>
  );
};

export default TitleSkeleton;
