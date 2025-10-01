import React, { createContext, useReducer } from "react";
import { FILTER_DATA, sortOptions } from "./Constants";

const initialState = {
  currentContent: [],
  totalCount: 0,
  currentPage: 1,
  filtersData: { ...FILTER_DATA },
  selectedFilters: {},
  sortBy: sortOptions?.[2],
  isLoading: true,
  isFiltersLoading: true,
  isDataLoading: false,
  error: null,
};
const context = createContext(initialState);
const { Provider } = context;

const actions = {
  SET_CURRENT_CONTENT: "SET_CURRENT_CONTENT",
  SET_TOTAL_COUNT: "SET_TOTAL_COUNT",
  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
  SET_FILTERS_DATA: "SET_FILTERS_DATA",
  SET_SELECTED_FILTERS: "SET_SELECTED_FILTERS",
  SET_SORT_BY: "SET_SORT_BY",
  SET_LOADING: "SET_LOADING",
  SET_FILTERS_LOADING: "SET_FILTERS_LOADING",
  SET_DATA_LOADING: "SET_DATA_LOADING",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case actions.SET_CURRENT_CONTENT:
        return { ...state, currentContent: action.payload };
      case actions.SET_TOTAL_COUNT:
        return { ...state, totalCount: action.payload };
      case actions.SET_CURRENT_PAGE:
        return { ...state, currentPage: action.payload };
      case actions.SET_FILTERS_DATA:
        return { ...state, filtersData: action.payload };
      case actions.SET_SELECTED_FILTERS:
        return { ...state, selectedFilters: action.payload };
      case actions.SET_SORT_BY:
        return { ...state, sortBy: action.payload };
      case actions.SET_LOADING:
        return { ...state, isLoading: action.payload };
      case actions.SET_FILTERS_LOADING:
        return { ...state, isFiltersLoading: action.payload };
      case actions.SET_DATA_LOADING:
        return { ...state, isDataLoading: action.payload };
      case actions.SET_ERROR:
        return { ...state, error: action.payload };
      case actions.CLEAR_ERROR:
        return { ...state, error: null };
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

const withContext = (WrappedComponent) => {
  return (props) => (
    <StateProvider>
      <WrappedComponent {...props} />
    </StateProvider>
  );
};

export { actions, context, withContext };
