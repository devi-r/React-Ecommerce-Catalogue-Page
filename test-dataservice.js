// Test script to verify DataService integration
// Run this in browser console or as a separate test file

import { DataService } from "./DataService";

const testDataService = async () => {
  console.log("Testing DataService integration...");

  try {
    // Test 1: Get filters
    console.log("Test 1: Fetching filters...");
    const filtersResponse = await DataService.getFilters();
    console.log("✅ Filters loaded:", filtersResponse.data);

    // Test 2: Get items with gender filter
    console.log("Test 2: Fetching men's items...");
    const menItemsResponse = await DataService.getItems({
      gender: "men",
      page: 1,
      pageSize: 5,
    });
    console.log("✅ Men's items loaded:", menItemsResponse.data);

    // Test 3: Get items with multiple filters
    console.log("Test 3: Fetching filtered items...");
    const filteredResponse = await DataService.getItems({
      gender: "men",
      category: "Headphones",
      sort: "popularity",
      page: 1,
      pageSize: 3,
    });
    console.log("✅ Filtered items loaded:", filteredResponse.data);

    // Test 4: Test pagination
    console.log("Test 4: Testing pagination...");
    const page2Response = await DataService.getItems({
      gender: "men",
      page: 2,
      pageSize: 5,
    });
    console.log("✅ Page 2 loaded:", page2Response.data);

    console.log("🎉 All tests passed! DataService integration successful.");
  } catch (error) {
    console.error("❌ Test failed:", error);
    console.error(
      "Make sure the backend server is running on http://localhost:4000"
    );
  }
};

// Run tests
testDataService();
