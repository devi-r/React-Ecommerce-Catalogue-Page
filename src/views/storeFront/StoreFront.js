import React, { useEffect, useState, useContext } from "react";
import { PAGE_SIZE, GENDER } from "./Constants";
import { DataService } from "./DataService";
import { usePrevious } from "./hooks/usePrevious";
import { actions, context, withContext } from "./StoreFrontContext";
import { isEmpty } from "./Utils";
import StoreFrontView from "./StoreFrontView";

const StoreFront = () => {
  const {
    state: {
      allContent = [],
      allFilteredContent = [],
      filtersData = {},
      selectedFilters = {},
      sortBy,
    },
    dispatch,
  } = useContext(context);

  const [contentView, setContentView] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  const prevSelectedFilters = usePrevious(selectedFilters);

  const handleCurrentContent = (allData, page) => {
    const newData = allData?.slice(
      (page - 1) * PAGE_SIZE,
      (page - 1) * PAGE_SIZE + PAGE_SIZE
    );
    dispatch({ type: actions.SET_CURRENT_CONTENT, payload: newData });
  };

  useEffect(() => {
    DataService.getAllData({ selectedFilters }).then((response) => {
      const allData = selectedFilters?.gender
        ? response?.data?.data
        : response
            ?.reduce((acc, item) => {
              acc = acc.concat(item.data.data);
              return acc;
            }, [])
            .filter((value, index, self) => {
              return (
                self.findIndex((v) => v.productId === value.productId) === index
              );
            })
            .sort((a, b) =>
              Number(a?.[sortBy.key]) - Number(b?.[sortBy.key]) > 0 ? -1 : 1
            );

      dispatch({ type: actions.SET_TOTAL_COUNT, payload: allData?.length });
      dispatch({ type: actions.SET_ALL_CONTENT, payload: allData });
      dispatch({ type: actions.SET_ALL_FILTERED_CONTENT, payload: [] });
      handleCurrentContent(allData, 1);

      DataService.getFilters().then((response) => {
        const itemTypes = allData?.reduce((acc, item) => {
          if (!acc.category) {
            acc.category = [];
          }
          if (!acc.brand) {
            acc.brand = [];
          }
          acc.category.push({ id: item.category, value: item.category });
          acc.brand.push({ id: item.brand, value: item.brand });

          return acc;
        }, {});

        Object.keys(itemTypes).forEach((key) => {
          itemTypes[key] = itemTypes[key].filter((value, index, self) => {
            return self.findIndex((v) => v.id === value.id) === index;
          });
        });

        const filterItems = response.data;

        Object.keys(itemTypes).forEach((key) => {
          filterItems[key].filterValues = itemTypes[key];
        });

        dispatch({
          type: actions.SET_FILTERS_DATA,
          payload: { ...filtersData, filterItems },
        });
        dispatch({
          type: actions.SET_SELECTED_FILTERS,
          payload: { gender: selectedFilters.gender },
        });
      });
    });
  }, [selectedFilters.gender]);

  useEffect(() => {
    if (
      JSON.stringify(prevSelectedFilters) !== JSON.stringify(selectedFilters)
    ) {
      const filterApplied =
        !isEmpty(selectedFilters) &&
        Object.values(selectedFilters)?.filter(
          (e) => !isEmpty(e) && GENDER?.indexOf(e) < 0
        )?.length !== 0;

      if (filterApplied) {
        let allData = [];

        Object.keys(selectedFilters)?.forEach((key) => {
          if (key !== "gender") {
            let value = selectedFilters[key];
            allData = allData.concat(
              [...allContent]?.filter((item) => {
                if (key !== "price" && key !== "discount") {
                  return Array.isArray(value)
                    ? value?.indexOf(item[key]) >= 0
                    : value === item[key];
                } else if (key === "discount") {
                  const discountItem = filtersData?.filterItems?.discount?.filterValues?.find(
                    (e) => e.id === value
                  );
                  const discountPercentage = (item.discount / item.mrp) * 100;

                  return (
                    discountPercentage >= discountItem.start &&
                    discountPercentage < discountItem.end
                  );
                } else if (key === "price") {
                  const priceItems = [];

                  value?.forEach((valueKey) => {
                    priceItems.push(
                      filtersData?.filterItems?.price?.filterValues?.find(
                        (e) => e.id === valueKey
                      )
                    );
                  });

                  return priceItems?.some(
                    (priceItem) =>
                      item.price >= priceItem.start &&
                      item.price < priceItem.end
                  );
                }
              })
            );
          }
        });

        dispatch({
          type: actions.SET_ALL_FILTERED_CONTENT,
          payload: allData,
        });
        dispatch({ type: actions.SET_TOTAL_COUNT, payload: allData?.length });
        handleCurrentContent(allData, 1);
      } else {
        dispatch({
          type: actions.SET_ALL_FILTERED_CONTENT,
          payload: [],
        });
        dispatch({
          type: actions.SET_TOTAL_COUNT,
          payload: allContent?.length,
        });
        handleCurrentContent(allContent, 1);
      }
    }
  }, [selectedFilters]);

  const handlePageChange = (page) => {
    const filterApplied =
      !isEmpty(selectedFilters) &&
      Object.values(selectedFilters)?.filter((e) => !isEmpty(e))?.length !== 0;
    handleCurrentContent(filterApplied ? allFilteredContent : allContent, page);
  };

  const handleToggleView = (view) => {
    setContentView(view);
  };

  const handleFilterClick = (filterItem, value) => {
    dispatch({
      type: actions.SET_SELECTED_FILTERS,
      payload: { ...selectedFilters, [filterItem]: value },
    });
  };

  const handleFilterClearAll = () => {
    dispatch({ type: actions.SET_SELECTED_FILTERS, payload: {} });
  };

  const handleSortBy = (value) => {
    const filterApplied =
      !isEmpty(selectedFilters) &&
      Object.values(selectedFilters)?.filter((e) => !isEmpty(e))?.length !== 0;

    const sortedAllData = [...allContent]?.sort((a, b) =>
      Number(a?.[value.key]) - Number(b?.[value.key]) > 0 ? -1 : 1
    );
    const sortedFilteredData = [...allFilteredContent]?.sort((a, b) =>
      Number(a?.[value.key]) - Number(b?.[value.key]) > 0 ? -1 : 1
    );

    dispatch({
      type: actions.SET_ALL_CONTENT,
      payload: sortedAllData,
    });
    dispatch({
      type: actions.SET_ALL_FILTERED_CONTENT,
      payload: sortedFilteredData,
    });

    dispatch({
      type: actions.SET_TOTAL_COUNT,
      payload: filterApplied
        ? sortedFilteredData?.length
        : sortedAllData?.length,
    });

    dispatch({
      type: actions.SET_SORT_BY,
      payload: value,
    });

    handleCurrentContent(filterApplied ? sortedFilteredData : sortedAllData, 1);
  };

  const handleMobileFilters = () => {
    setShowFilters((e) => !e);
  };

  return (
    <StoreFrontView
      handlers={{
        handlePageChange,
        handleToggleView,
        handleFilterClick,
        handleFilterClearAll,
        handleSortBy,
        handleMobileFilters,
      }}
      contentView={contentView}
      showFilters={showFilters}
    />
  );
};

export default withContext(StoreFront);
