import React from "react";
import styles from "../../storefront.module.scss";
import contentStyles from "../content/content.module.scss";
import {
  TitleSkeleton,
  FiltersSkeleton,
  CardSkeleton,
  TopControlsSkeleton,
} from "./index";

const FullPageSkeleton = () => {
  return (
    <>
      {/* Title Section */}
      <TitleSkeleton />

      {/* Main Content Area */}
      <div className={styles.filterContentWrapper}>
        {/* Left Sidebar - Filters */}
        <div className={styles.leftContainer}>
          <FiltersSkeleton />
        </div>

        {/* Right Content Area */}
        <div className={styles.rightContainer}>
          {/* Top Controls */}
          <TopControlsSkeleton />

          {/* Content Grid */}
          <div className={`${contentStyles.container} ${contentStyles.grid}`}>
            {Array.from({ length: 20 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FullPageSkeleton;
