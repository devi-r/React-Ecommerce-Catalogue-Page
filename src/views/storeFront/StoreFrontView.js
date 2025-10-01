import React, { useContext } from "react";
import styles from "./storefront.module.scss";
import Filters from "./components/filters/Filters";
import Sort from "./components/sort/Sort";
import Content from "./components/content/Content";
import { sortOptions } from "./Constants";
import Pagination from "./components/pagination/Pagination";
import { context } from "./StoreFrontContext";
import { FullPageSkeleton, ContentSkeleton } from "./components/skeleton";
import ErrorState from "./components/errorState/ErrorState";

export const StoreFrontView = ({
  handlePageChange = () => {},
  handleFilterClick = () => {},
  handleFilterClearAll = () => {},
  handleSortBy = () => {},
  handleMobileFilters = () => {},
  showFilters,
  isLoading = false,
  isFiltersLoading = false,
  isDataLoading = false,
  error = null,
  onRetry = () => {},
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

  // Show error state if there's an error
  if (error) {
    return <ErrorState error={error} onRetry={onRetry} />;
  }

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
              loadingState={{
                isLoading: isFiltersLoading,
                loader: <div>Loading filters...</div>,
              }}
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
                    loadingState={{
                      isLoading: isFiltersLoading,
                      loader: <div>Loading filters...</div>,
                    }}
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
                  {isDataLoading ? (
                    <ContentSkeleton />
                  ) : (
                    <Content
                      view="grid"
                      data={currentContent}
                      tag={
                        sortBy.key === "trending" ||
                        sortBy.key === "recommended"
                          ? null
                          : "showAllTags"
                      }
                    />
                  )}

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
