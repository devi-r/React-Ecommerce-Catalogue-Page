import axios from "axios";

const fetch = (url) => axios.get(url);

const dataUrl = (gender) => `dataSource/${gender}.json`;

export const DataService = {
  getAllData: ({ selectedFilters: { gender = null } }) => {
    return new Promise((resolve, reject) => {
      let promise = gender
        ? fetch(dataUrl(gender))
        : Promise.all([
            fetch("dataSource/men.json"),
            fetch("dataSource/women.json"),
            fetch("dataSource/boys.json"),
            fetch("dataSource/girls.json"),
          ]);
      promise.then((resp) => {
        resolve(resp);
      });
    });
  },

  getFilters: () => {
    return new Promise((resolve, reject) => {
      fetch("dataSource/filters.json").then((resp) => {
        resolve(resp);
      });
    });
  },
};
