import React from "react";
import styles from "../../storefront.module.scss";
import {
  TitleSkeleton,
  FiltersSkeleton,
  ContentSkeleton,
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
          <ContentSkeleton />
        </div>
      </div>
    </>
  );
};

export default FullPageSkeleton;
