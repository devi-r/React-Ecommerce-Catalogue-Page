import React, { useContext } from "react";
import styles from "./storefront.module.scss";
import Filters from "./components/filters/Filters";
import Sort from "./components/sort/Sort";
import Content from "./components/content/Content";
import { sortOptions } from "./Constants";
import Pagination from "./components/pagination/Pagination";
import { context } from "./StoreFrontContext";
import { FullPageSkeleton } from "./components/skeleton";

export const StoreFrontView = ({
  handlers: {
    handlePageChange = () => {},
    handleFilterClick = () => {},
    handleFilterClearAll = () => {},
    handleSortBy = () => {},
    handleMobileFilters = () => {},
  },
  showFilters,
  isLoading = false,
}) => {
  const {
    state: {
      currentContent = [],
      totalCount = 0,
      filtersData = {},
      selectedFilters = {},
      sortBy = "",
    },
  } = useContext(context);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <FullPageSkeleton />
      ) : (
        <>
          {showFilters ? (
            <Filters
              {...filtersData}
              selectedFilters={selectedFilters}
              handleFilterClick={handleFilterClick}
              handleFilterAction={handleFilterClearAll}
              isFilterPopup={true}
              handleCloseFilterPopup={handleMobileFilters}
            />
          ) : (
            <>
              <div className={styles.titleWrapper}>
                <div className={styles.title}>
                  <div className={styles.text}>D Store</div>
                  <div
                    className={styles.totalCount}
                  >{` - ${totalCount} items`}</div>
                </div>
                <button
                  className={styles.filterButton}
                  onClick={handleMobileFilters}
                >
                  Filters
                </button>
              </div>
              <div className={styles.filterContentWrapper}>
                <div className={styles.leftContainer}>
                  <Filters
                    {...filtersData}
                    selectedFilters={selectedFilters}
                    handleFilterClick={handleFilterClick}
                    handleFilterAction={handleFilterClearAll}
                  />
                </div>
                <div className={styles.rightContainer}>
                  <div className={styles.topWrapper}>
                    <div className={styles.sortWrapper}>
                      <Sort
                        options={sortOptions}
                        name="sortBy"
                        title="Sort by"
                        defaultOption={sortBy}
                        handleSort={handleSortBy}
                      />
                    </div>
                  </div>
                  <Content view="grid" data={currentContent} tag={sortBy} />

                  <Pagination
                    totalCount={totalCount}
                    elementPerPage={20}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default StoreFrontView;
