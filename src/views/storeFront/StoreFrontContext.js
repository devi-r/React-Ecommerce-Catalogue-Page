import React, { createContext, useReducer } from "react";
import { FILTER_DATA, sortOptions } from "./Constants";

const initialState = {
  allContent: [],
  allFilteredContent: [],
  currentContent: [],
  totalCount: 0,
  filtersData: { ...FILTER_DATA },
  selectedFilters: {},
  sortBy: sortOptions?.[2],
  isLoading: true,
};
const context = createContext(initialState);
const { Provider } = context;

const actions = {
  SET_ALL_CONTENT: "SET_ALL_CONTENT",
  SET_ALL_FILTERED_CONTENT: "SET_ALL_FILTERED_CONTENT",
  SET_CURRENT_CONTENT: "SET_CURRENT_CONTENT",
  SET_TOTAL_COUNT: "SET_TOTAL_COUNT",
  SET_FILTERS_DATA: "SET_FILTERS_DATA",
  SET_SELECTED_FILTERS: "SET_SELECTED_FILTERS",
  SET_SORT_BY: "SET_SORT_BY",
  SET_LOADING: "SET_LOADING",
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case actions.SET_ALL_CONTENT:
        return { ...state, allContent: action.payload };
      case actions.SET_ALL_FILTERED_CONTENT:
        return { ...state, allFilteredContent: action.payload };
      case actions.SET_CURRENT_CONTENT:
        return { ...state, currentContent: action.payload };
      case actions.SET_TOTAL_COUNT:
        return { ...state, totalCount: action.payload };
      case actions.SET_FILTERS_DATA:
        return { ...state, filtersData: action.payload };
      case actions.SET_SELECTED_FILTERS:
        return { ...state, selectedFilters: action.payload };
      case actions.SET_SORT_BY:
        return { ...state, sortBy: action.payload };
      case actions.SET_LOADING:
        return { ...state, isLoading: action.payload };
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
