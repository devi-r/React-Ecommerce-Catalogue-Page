import React, { useEffect, useState, useContext, useRef } from "react";
import { PAGE_SIZE } from "./Constants";
import { DataService } from "./DataService";
import { usePrevious } from "./hooks/usePrevious";
import { actions, context, withContext } from "./StoreFrontContext";
import StoreFrontView from "./StoreFrontView";

const StoreFront = () => {
  const {
    state: {
      filtersData = {},
      selectedFilters = {},
      sortBy,
      isLoading = true,
      isFiltersLoading = true,
      isDataLoading = false,
      error = null,
    },
    dispatch,
  } = useContext(context);

  const [showFilters, setShowFilters] = useState(false);
  const isInitialLoadRef = useRef(true);
  const prevSelectedFilters = usePrevious(selectedFilters);

  // Clear error when starting new requests
  const clearError = () => {
    dispatch({ type: actions.CLEAR_ERROR });
  };

  // Set error state
  const setError = (error) => {
    dispatch({ type: actions.SET_ERROR, payload: error });
  };

  // Fetch filters from backend API (only on initial load)
  const fetchFilters = async () => {
    try {
      clearError();
      dispatch({ type: actions.SET_FILTERS_LOADING, payload: true });

      const filtersResponse = await DataService.getFilters();

      dispatch({
        type: actions.SET_FILTERS_DATA,
        payload: { ...filtersData, filterItems: filtersResponse.data.data },
      });

      dispatch({ type: actions.SET_FILTERS_LOADING, payload: false });
    } catch (error) {
      console.error("Error fetching filters:", error);
      setError({
        message: "Failed to load filters. Please try again.",
        type: "filters",
        originalError: error,
      });
      dispatch({ type: actions.SET_FILTERS_LOADING, payload: false });
    }
  };

  // Fetch data from backend API
  const fetchData = async (page = 1, resetPage = false) => {
    try {
      clearError();

      // Set loading states
      if (isInitialLoadRef.current) {
        dispatch({ type: actions.SET_LOADING, payload: true });
      } else {
        dispatch({ type: actions.SET_DATA_LOADING, payload: true });
      }

      // Prepare API parameters
      const apiParams = {
        page: resetPage ? 1 : page,
        pageSize: PAGE_SIZE,
      };

      // Add gender filter
      if (selectedFilters.gender) {
        apiParams.gender = selectedFilters.gender;
      }

      // Add other filters
      if (selectedFilters.category) {
        apiParams.category = Array.isArray(selectedFilters.category)
          ? selectedFilters.category.join(",")
          : selectedFilters.category;
      }

      if (selectedFilters.brand) {
        apiParams.brand = Array.isArray(selectedFilters.brand)
          ? selectedFilters.brand.join(",")
          : selectedFilters.brand;
      }

      if (selectedFilters.primaryColour) {
        apiParams.color = Array.isArray(selectedFilters.primaryColour)
          ? selectedFilters.primaryColour.join(",")
          : selectedFilters.primaryColour;
      }

      if (selectedFilters.price) {
        apiParams.price_range = Array.isArray(selectedFilters.price)
          ? selectedFilters.price.join(",")
          : selectedFilters.price;
      }

      if (selectedFilters.discount) {
        apiParams.discount_range = selectedFilters.discount;
      }

      // Add sorting
      if (sortBy.key) {
        apiParams.sort = sortBy.key;
      }

      // Fetch items from backend
      const response = await DataService.getItems(apiParams);
      const { data, pagination, totalCount: total } = response.data;

      // Update state with backend response
      dispatch({ type: actions.SET_CURRENT_CONTENT, payload: data });
      dispatch({ type: actions.SET_TOTAL_COUNT, payload: total });
      dispatch({
        type: actions.SET_CURRENT_PAGE,
        payload: pagination.currentPage,
      });

      // Handle loading states
      if (isInitialLoadRef.current) {
        dispatch({ type: actions.SET_LOADING, payload: false });
        isInitialLoadRef.current = false;
      } else {
        dispatch({ type: actions.SET_DATA_LOADING, payload: false });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError({
        message: "Failed to load products. Please try again.",
        type: "data",
        originalError: error,
      });

      if (isInitialLoadRef.current) {
        dispatch({ type: actions.SET_LOADING, payload: false });
      } else {
        dispatch({ type: actions.SET_DATA_LOADING, payload: false });
      }
    }
  };

  // Retry function for error state
  const handleRetry = () => {
    if (isInitialLoadRef.current) {
      fetchFilters();
      fetchData(1, true);
    } else {
      fetchData(1, true);
    }
  };

  // Effect for initial load - fetch both filters and data
  useEffect(() => {
    if (isInitialLoadRef.current) {
      fetchFilters();
      fetchData(1, true);
    }
  }, []);

  // Effect for filter changes - only fetch data
  useEffect(() => {
    // Skip initial render to avoid duplicate calls
    if (!isInitialLoadRef.current) {
      // Only fetch if filters actually changed
      const filtersChanged =
        JSON.stringify(prevSelectedFilters) !== JSON.stringify(selectedFilters);

      if (filtersChanged) {
        fetchData(1, true);
      }
    }
  }, [selectedFilters]);

  // Effect for sort changes
  useEffect(() => {
    // Skip initial load - sort is already handled by filter effect
    if (!isInitialLoadRef.current) {
      fetchData(1, true);
    }
  }, [sortBy]);

  // Page change
  const handlePageChange = (page) => {
    fetchData(page, false);
  };

  // Filter handling
  const handleFilterClick = (filterItem, value) => {
    dispatch({
      type: actions.SET_SELECTED_FILTERS,
      payload: { ...selectedFilters, [filterItem]: value },
    });
  };

  const handleFilterClearAll = () => {
    dispatch({ type: actions.SET_SELECTED_FILTERS, payload: {} });
  };

  // Sort handling
  const handleSortBy = (value) => {
    dispatch({
      type: actions.SET_SORT_BY,
      payload: value,
    });
  };

  return (
    <StoreFrontView
      showFilters={showFilters}
      setShowFilters={setShowFilters}
      handleFilterClick={handleFilterClick}
      handleFilterClearAll={handleFilterClearAll}
      handleSortBy={handleSortBy}
      handlePageChange={handlePageChange}
      isLoading={isLoading}
      isFiltersLoading={isFiltersLoading}
      isDataLoading={isDataLoading}
      error={error}
      onRetry={handleRetry}
    />
  );
};

export default withContext(StoreFront);
