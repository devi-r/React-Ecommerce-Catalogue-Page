export const PAGE_SIZE = 20;

export const FILTER_DATA = {
  header: "FILTERS",
  hasFilterAction: true,
  filterActionText: "CLEAR ALL",
  filterItems: null,
};

export const sortOptions = [
  {
    key: "popularity",
    value: "Popularity",
    label: "Popular",
  },
  {
    key: "trending",
    value: "Trending",
    label: "Trending",
  },
  {
    key: "recommended",
    value: "Recommended",
    label: "Recommended",
  },
  {
    key: "price_low_to_high",
    value: "Price Low to High",
    label: "Price: Low to High",
  },
  {
    key: "price_high_to_low",
    value: "Price High to Low",
    label: "Price: High to Low",
  },
  {
    key: "discount_high_to_low",
    value: "Discount High to Low",
    label: "Discount: High to Low",
  },
  {
    key: "newest",
    value: "Newest",
    label: "Newest",
  },
];
