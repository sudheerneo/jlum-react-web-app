const webpack = require("webpack");

module.exports = {
  webpack(config, options) {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
      })
    );
    return config;
  },
};
