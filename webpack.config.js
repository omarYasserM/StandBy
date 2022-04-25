const path = require("path");
const HtmlWebpackplugin = require("html-webpack-plugin");

let htmlPageNames = ["categories", "signup", "home"];
let multipleHtmlPlugins = htmlPageNames.map((name) => {
  return new HtmlWebpackplugin({
    template: `./src/views/${name}/index.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`], // respective JS files
  });
});

module.exports = {
  mode: "development",
  entry: {
    categories: "./src/js/controller/categories.js",
    signup: "./src/js/controller/signup.js",
    home: "./src/js/controller/home.js",
  },

  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [].concat(multipleHtmlPlugins),
  watch: true,
};
