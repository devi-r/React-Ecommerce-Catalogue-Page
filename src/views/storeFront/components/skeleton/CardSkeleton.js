import React from "react";
import Skeleton from "./Skeleton";
import styles from "../content/card/card.module.scss";

const CardSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Skeleton width="100%" height="100%" />
      </div>
      <div className={styles.metaWrapper}>
        <div className={styles.togglingMeta}>
          <div className={styles.textWrapper}>
            <div>
              <Skeleton width="100px" height="16px" className={styles.brand} />
              <Skeleton
                width="150px"
                height="14px"
                className={styles.product}
              />
              <Skeleton width="80px" height="14px" className={styles.price} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
