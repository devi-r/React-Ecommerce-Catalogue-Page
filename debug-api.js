// Debug script to test API calls from frontend
// Run this in browser console to debug the issue

const testAPI = async () => {
  console.log("Testing API calls...");

  try {
    // Test filters API
    console.log("1. Testing filters API...");
    const filtersResponse = await fetch(
      "http://localhost:4000/api/ecommerce/filters"
    );
    const filtersData = await filtersResponse.json();
    console.log("Filters response:", filtersData);

    // Test items API
    console.log("2. Testing items API...");
    const itemsResponse = await fetch(
      "http://localhost:4000/api/ecommerce/items?page=1&pageSize=5"
    );
    const itemsData = await itemsResponse.json();
    console.log("Items response:", itemsData);

    // Check if data is in expected format
    console.log("3. Checking data format...");
    console.log(
      "Filters data structure:",
      typeof filtersData.data,
      Object.keys(filtersData.data || {})
    );
    console.log(
      "Items data structure:",
      typeof itemsData.data,
      Array.isArray(itemsData.data),
      itemsData.data?.length
    );
  } catch (error) {
    console.error("API test failed:", error);
  }
};

// Run the test
testAPI();
