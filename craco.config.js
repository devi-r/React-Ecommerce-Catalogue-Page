// remote-app/craco.config.js
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output.publicPath = "auto";

      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: "EcommerceCatalogue", // The unique name for this remote
          filename: "remoteEntry.js",
          exposes: {
            // Expose the EcommerceCatalogue component
            "./App": "./src/pages/EcommerceCatalogue",
          },
          shared: {
            ...deps,
            react: {
              singleton: true,
              requiredVersion: deps.react,
            },
            "react-dom": {
              singleton: true,
              requiredVersion: deps["react-dom"],
            },
            "react-router-dom": {
              singleton: true,
              requiredVersion: deps["react-router-dom"],
            },
          },
        })
      );
      return webpackConfig;
    },
  },
};
