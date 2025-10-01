# React Ecommerce Catalogue Page

This project is a clone of [React-Myntra-Catalogue-Page](https://github.com/devi-r/React-Myntra-Catalogue-Page) with UI enhancements, code cleanup, and moving logic and data fetch to backend.

## Demo

**Live Preview:** [https://react-ecommerce-catalogue-page.onrender.com](https://react-ecommerce-catalogue-page.onrender.com)

This application is configured as a **remote microfrontend** setup using CRACO (Create React App Configuration Override) and includes **container queries** for responsive styling. The microfrontend architecture allows this application to be consumed by other applications while maintaining its own development and deployment lifecycle.

Features:

- Ability to filter by Gender, Category, Brand, Price, Color, Discount Rate
- Ability to Sort
- Paginated views
- Ability to view items in grid

## Getting Started

### Prerequisites

A stable version of node installed in the system (preferably the latest.)

### Installing

Clone the repo from github.

```
git clone <repo-url>
```

Go to the project home directory on the cloned repo and install the packages (packages are listed in the packages.json file) by executing.

```
npm install
```

Run the project locally by:

```
npm start
```

This will host the project at default localhost:3000. Please open a web browser and direct to that link to see everything.

## API Integration

The frontend automatically detects the environment and uses the appropriate backend URL:

- **Development:** `http://localhost:4000` (when running `npm start`)
- **Production:** `https://express-mock-server-rose.vercel.app` (when built for production)

### API Endpoints

**Base URL:** `http://localhost:4000/api/ecommerce` (development) | `https://express-mock-server-rose.vercel.app/api/ecommerce` (production)

#### Items API

- **GET** `/items` - Get paginated items with filtering and sorting
  - **Query Parameters:**
    - `gender` - Filter by gender (men, women, boys, girls)
    - `category` - Filter by category (comma-separated)
    - `brand` - Filter by brand (comma-separated)
    - `color` - Filter by color (comma-separated)
    - `price_range` - Filter by price range (comma-separated)
    - `discount_range` - Filter by discount range
    - `sort` - Sort by (popularity, trending, recommended, price_low_to_high, price_high_to_low, discount_high_to_low, newest)
    - `page` - Page number (default: 1)
    - `pageSize` - Items per page (default: 20)

#### Filters API

- **GET** `/filters` - Get available filter options
  - **Query Parameters:** Same as items API for dynamic filtering

## License

This project is licensed under the MIT License.

## Author

- **[Devi R](https://www.linkedin.com/in/devi-r-06bb94a7)**
