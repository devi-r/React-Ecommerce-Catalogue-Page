import React from "react";
import Skeleton from "./Skeleton";
import styles from "../filters/filters.module.scss";
import checkboxStyles from "../filters/checkBox/checkbox.module.scss";

const FiltersSkeleton = () => {
  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filterHeader}>
        <Skeleton width="100px" height="20px" className={styles.headerLabel} />
        <Skeleton width="60px" height="20px" className={styles.filterAction} />
      </div>

      <div className={styles.filterItemsContainer}>
        {/* Gender Filter */}
        <div className={styles.filterItemWrapper}>
          <div className={styles.filterItem}>
            <div className={styles.filterLabelContainer}>
              <Skeleton
                width="60px"
                height="16px"
                className={styles.filterLabel}
              />
            </div>
            <ul className={styles.filterListContainer}>
              {[1, 2, 3].map((item) => (
                <li
                  key={item}
                  className={styles.listItem}
                  style={{ marginBottom: "8px" }}
                >
                  <Skeleton width="80px" height="16px" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Category Filter */}
        <div className={styles.filterItemWrapper}>
          <div className={styles.filterItem}>
            <div className={styles.filterLabelContainer}>
              <Skeleton
                width="70px"
                height="16px"
                className={styles.filterLabel}
              />
            </div>
            <div className={styles.filterMultiSelect}>
              <div className={checkboxStyles.container}>
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className={checkboxStyles.listItem}
                    style={{ marginBottom: "8px" }}
                  >
                    <Skeleton
                      width="16px"
                      height="16px"
                      className={checkboxStyles.inputCheckbox}
                    />
                    <Skeleton
                      width="100px"
                      height="16px"
                      className={checkboxStyles.checkboxLabel}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Brand Filter */}
        <div className={styles.filterItemWrapper}>
          <div className={styles.filterItem}>
            <div className={styles.filterLabelContainer}>
              <Skeleton
                width="50px"
                height="16px"
                className={styles.filterLabel}
              />
            </div>
            <div className={styles.filterMultiSelect}>
              <div className={checkboxStyles.container}>
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className={checkboxStyles.listItem}
                    style={{ marginBottom: "8px" }}
                  >
                    <Skeleton
                      width="16px"
                      height="16px"
                      className={checkboxStyles.inputCheckbox}
                    />
                    <Skeleton
                      width="80px"
                      height="16px"
                      className={checkboxStyles.checkboxLabel}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Price Filter */}
        <div className={styles.filterItemWrapper}>
          <div className={styles.filterItem}>
            <div className={styles.filterLabelContainer}>
              <Skeleton
                width="50px"
                height="16px"
                className={styles.filterLabel}
              />
            </div>
            <div className={styles.filterMultiSelect}>
              <div className={checkboxStyles.container}>
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className={checkboxStyles.listItem}
                    style={{ marginBottom: "8px" }}
                  >
                    <Skeleton
                      width="16px"
                      height="16px"
                      className={checkboxStyles.inputCheckbox}
                    />
                    <Skeleton
                      width="120px"
                      height="16px"
                      className={checkboxStyles.checkboxLabel}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersSkeleton;
