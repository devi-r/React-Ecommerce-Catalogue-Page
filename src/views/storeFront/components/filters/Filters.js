import React, { useState } from "react";
import styles from "./filters.module.scss";
import RadioInput from "./radioInput/RadioInput";
import CheckBoxContainer from "./checkBox/CheckBox";
import { isEmpty } from "../../Utils";

const Filters = ({
  loadingState,
  filterItems,
  selectedFilters,
  header,
  isFilterPopup,
  wrapperClassName = null,
  hasFilterAction = true,
  filterActionClass = "",
  filterActionText = "",
  handleFilterAction = () => {},
  handleLoadMore = () => {},
  handleFilterClick = () => {},
  handleCloseFilterPopup = () => {},
}) => {
  const [loadMoreMap, setLoadMoreMap] = useState({});

  const handleLoadMoreMap = (item) => {
    let map = { ...loadMoreMap };
    map[item] = true;
    setLoadMoreMap(map);
  };
  return (
    <div
      className={`${
        wrapperClassName ??
        `${styles.filtersContainer} ${
          isFilterPopup ? styles.filterPopupContainer : ""
        }`
      }`}
    >
      {isFilterPopup ? (
        <div className={styles.popupClose} onClick={handleCloseFilterPopup}>
          <span>X</span>
        </div>
      ) : null}

      {header && (
        <div className={styles.filterHeader}>
          <div className={styles.headerLabel}>{header}</div>

          {hasFilterAction ? (
            <div
              className={`${styles.filterAction} ${filterActionClass ?? ""}`}
              onClick={handleFilterAction}
            >
              <span className={styles.actionText}>{filterActionText}</span>
            </div>
          ) : null}
        </div>
      )}
      {loadingState?.isLoading && loadingState?.loader ? (
        loadingState?.loader
      ) : (
        <div className={styles.filterItemsContainer}>
          {!isEmpty(filterItems) &&
            Object.keys(filterItems)?.map((filterItem, filterIndex) => {
              const { limit = 8, filterValues } = filterItems?.[filterItem];
              const sliceLimit = loadMoreMap?.[filterItem]
                ? filterValues?.length
                : limit;
              const remainingCount = loadMoreMap?.[filterItem]
                ? 0
                : filterValues?.length - sliceLimit;

              return (
                <>
                  {filterItems?.[filterItem]?.filterValues?.length ? (
                    <div
                      className={`${styles.filterItemWrapper} ${filterItem}`}
                      key={filterIndex}
                    >
                      <div className={`${styles.filterItem}`}>
                        <div className={styles.filterLabelContainer}>
                          <div className={styles.filterLabel}>
                            {filterItems?.[filterItem]?.label}
                          </div>
                        </div>

                        {filterItems?.[filterItem]?.multiSelect ? (
                          <>
                            <CheckBoxContainer
                              list={filterItems?.[
                                filterItem
                              ]?.filterValues?.slice(0, sliceLimit)}
                              addClass={styles.filterMultiSelect}
                              allowMultiSelect={true}
                              name={filterItem}
                              checkedItems={selectedFilters?.[filterItem]}
                              handleMultiSelectDisplay={(value) =>
                                handleFilterClick(filterItem, value)
                              }
                            />
                            {remainingCount > 0 && (
                              <div
                                className={styles.remainingCount}
                                onClick={() => handleLoadMoreMap(filterItem)}
                              >
                                + {remainingCount} more
                              </div>
                            )}
                          </>
                        ) : (
                          <ul
                            className={`${styles.filterListContainer} ${filterItem}`}
                          >
                            {filterItems?.[filterItem]?.filterValues?.map(
                              ({ id = "", value = "" }, itemIndex) => {
                                return (
                                  <li
                                    key={itemIndex}
                                    className={`${styles.listItem} ${id}`}
                                  >
                                    <RadioInput
                                      id={`${filterItem}_${id}_${itemIndex}`}
                                      label={`${value}`}
                                      name={filterItem}
                                      value={`${id}`}
                                      checked={
                                        !!(id === selectedFilters?.[filterItem])
                                      }
                                      handleClick={(e) =>
                                        handleFilterClick(filterItem, id)
                                      }
                                    />
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        )}
                      </div>
                    </div>
                  ) : null}
                </>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Filters;
