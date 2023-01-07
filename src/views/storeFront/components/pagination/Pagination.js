import React, { useEffect, useState } from "react";
import styles from "./pagination.module.scss";

const Pagination = ({
  totalCount,
  elementPerPage,
  pagesLength = 10,
  initialCurrentPage = 1,
  onPageChange: onPageChangeCallback = () => {},
  paginationIndexStart = 2,
}) => {
  const MIN_PAGE_NUMBERS = 7; // Minimum number of buttons for optimised view - 7
  const MIN_PAGINATION_INDEX = 2; // Minimum 2 as 1 is always visible
  const PAGE_EXPAND_ELLIPSIS = "...";
  // Initialize number of pages, maximum buttons visible, startIndex of pages.
  const initialState = {
    pages: Math.ceil(totalCount / elementPerPage),
    pagesLength:
      pagesLength && pagesLength > MIN_PAGE_NUMBERS
        ? pagesLength
        : MIN_PAGE_NUMBERS,
    startIndex:
      paginationIndexStart && paginationIndexStart > MIN_PAGINATION_INDEX
        ? paginationIndexStart
        : MIN_PAGINATION_INDEX,
    currentPage: initialCurrentPage,
  };

  /* ---- WORKING ----
  -- Object containing data for each page button --
  pagesObject: {
    label: // display text
    page: // page number
    expand: // true if it is a button for change of page range
    start: // true for first button and left expand button
    end: // true for last button and left expand button
  }
  onPageChange: sets startIndex as per action and then does the required startIndex and pagesToShow array change */

  /**
   * function to return all pages to be displayed in form of object array.
   * @param {*} passedState
   * @returns array of object containing page button details
   */
  const getPages = (passedState) => {
    // Returns all the button objects to be displayed.
    // Uses startIndex primarily.
    // * First and last pages are always added.
    // * expand is added based on conditions.
    var arr = [];
    var currentIndex = passedState.startIndex
      ? Math.max(passedState.startIndex, 2)
      : 2;

    arr.push({ page: 1, label: 1, start: true });
    if (currentIndex > 2) {
      arr.push({
        label: PAGE_EXPAND_ELLIPSIS,
        start: true,
        expand: true,
      });
    }
    while (
      arr.length < passedState.pagesLength &&
      currentIndex <= passedState.pages
    ) {
      if (
        arr.length === passedState.pagesLength - 2 &&
        currentIndex + 1 < passedState.pages
      ) {
        arr.push({
          label: PAGE_EXPAND_ELLIPSIS,
          end: true,
          expand: true,
        });
        arr.push({
          page: passedState.pages,
          label: passedState.pages,
          end: true,
          expand: false,
        });
        break;
      } else if (currentIndex === passedState.pages) {
        arr.push({
          page: passedState.pages,
          label: passedState.pages,
          end: true,
        });
        break;
      } else {
        arr.push({ page: currentIndex, label: currentIndex });
        currentIndex++;
      }
    }

    return arr;
  };

  const findStartIndex = (stateDetails, navigationFlag) => {
    let startIndex = stateDetails.startIndex;

    if (!navigationFlag) {
      if (
        state.currentPage >=
        stateDetails.pages - stateDetails.pagesLength + 3
      ) {
        // EDGE CASE - resize on some page near end of pages
        startIndex = stateDetails.pages - stateDetails.pagesLength + 3;
      } else {
        startIndex =
          stateDetails.currentPage < MIN_PAGINATION_INDEX
            ? MIN_PAGINATION_INDEX
            : stateDetails.currentPage;
      }

      return startIndex;
    }
    if (
      stateDetails.pagesToShow.every(
        (page) => page.page !== stateDetails.currentPage
      )
    ) {
      if (navigationFlag === "previous") {
        if (state.currentPage === state.pages) {
          //EDGE CASE - Prev from end
          startIndex = stateDetails.pages - stateDetails.pagesLength + 3;
        } else {
          startIndex = stateDetails.startIndex - 2;
        }

        if (startIndex < MIN_PAGINATION_INDEX) {
          startIndex = MIN_PAGINATION_INDEX;
        }
      } else if (navigationFlag === "next") {
        if (state.currentPage === 1) {
          //EDGE CASE - Next from start
          startIndex = 2;
        } else {
          startIndex = stateDetails.startIndex + 2;
        }

        if (
          state.currentPage >=
          stateDetails.pages - stateDetails.pagesLength + 3
        ) {
          // EDGE CASE - resize on some page near end of pages
          startIndex = stateDetails.pages - stateDetails.pagesLength + 3;
        }
      }
    }

    return startIndex;
  };

  const [state, setState] = useState({
    ...initialState,
    pagesToShow: getPages(initialState),
  });

  useEffect(() => {
    var newState = { ...state };

    newState.pages = Math.ceil(totalCount / elementPerPage);
    newState.pagesLength =
      pagesLength && pagesLength > MIN_PAGE_NUMBERS
        ? pagesLength
        : MIN_PAGE_NUMBERS;
    newState.startIndex = findStartIndex(newState);
    newState.pagesToShow = getPages(newState);
    setState(newState);
  }, [totalCount, pagesLength, elementPerPage, paginationIndexStart]);

  const onPageChange = (pageObject) => {
    // Fired on click on any of buttons except prev and next
    var newState = { ...state };

    if (pageObject.page && !pageObject.expand) {
      if (pageObject.start) {
        newState.startIndex = 2;
      } else if (pageObject.end) {
        newState.startIndex =
          newState.pages -
          newState.pagesLength +
          (newState.pages === newState.pagesLength ? 2 : 3);
      }
      if (state.currentPage !== pageObject.page) {
        onPageChangeCallback(pageObject.page);
      }
    } else {
      if (pageObject.start) {
        var estimatedStart =
          newState.startIndex - Math.floor(newState.pagesLength / 2);

        if (estimatedStart < 2) {
          estimatedStart = 2;
        }
      } else if (pageObject.end) {
        estimatedStart =
          newState.startIndex + Math.ceil(newState.pagesLength / 2);
        if (estimatedStart + newState.pagesLength - 2 > newState.pages) {
          estimatedStart = newState.pages - newState.pagesLength + 3;
        }
      }
      newState.startIndex = estimatedStart;
    }
    if (pageObject.label !== PAGE_EXPAND_ELLIPSIS) {
      newState.currentPage = pageObject.page;
    }
    newState.pagesToShow = getPages(newState);
    setState(newState);
  };

  const handlePreviousClick = () => {
    let newState = { ...state };

    if (state.currentPage > 1) {
      //If page is not in shown page numbers then make that page visible
      newState.currentPage -= 1;
      newState.startIndex = findStartIndex(newState, "previous");
      newState.pagesToShow = getPages(newState);
      setState(newState);
      onPageChangeCallback(newState.currentPage, "previous");
    }
  };

  const handleNextClick = () => {
    let newState = { ...state };

    if (state.currentPage < state.pages) {
      newState.currentPage += 1;
      newState.startIndex = findStartIndex(newState, "next");
      newState.pagesToShow = getPages(newState);
      setState(newState);
      onPageChangeCallback(newState.currentPage, "next");
    }
  };

  return (
    <div className={styles.numberPagination}>
      <div className={styles.paginationDivider}>
        <div></div>
      </div>
      <div className={styles.contentPagination}>
        <div
          className={`${styles.button} ${
            state.currentPage <= 1 ? styles.disabled : ""
          }`}
          onClick={() => {
            handlePreviousClick();
          }}
        >
          <span className={styles.actionText}>Previous</span>
          <span className={styles.actionIcon}>{`<`}</span>
        </div>
        <div className={styles.pageNumbers}>
          {state.pagesToShow.map((val, index) => (
            <div
              key={index}
              className={`${styles.paginationPage} ${
                state.currentPage === val.page ? styles.active : ""
              }`}
              onClick={() => onPageChange(val)}
            >
              {val.label}
            </div>
          ))}
        </div>
        <div
          className={`${styles.button} ${
            state.currentPage >= state.pages ? styles.disabled : ""
          }`}
          onClick={() => {
            handleNextClick();
          }}
        >
          <span className={styles.actionText}>Next</span>
          <span className={styles.actionIcon}>{`>`}</span>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
