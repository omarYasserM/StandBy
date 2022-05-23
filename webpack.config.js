const path = require("path");
const HtmlWebpackplugin = require("html-webpack-plugin");

const htmlPageNames = [
  "categories",
  "signup",
  "profile",
  "admin",
  "login",
  "contactUs",
];

const multipleHtmlPlugins = htmlPageNames.map((name) => {
  return new HtmlWebpackplugin({
    template: `./src/views/${name}/index.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`], // respective JS files
  });
});
var multipleEntries = htmlPageNames.reduce((map, item) => {
  map[item] = `./src/js/controller/${item}.js`;
  return map;
}, {});

module.exports = {
  mode: "development",
  entry: { ...multipleEntries, home: `./src/js/controller/home.js` },
  output: {
    path: path.resolve(__dirname, "StandBy"),
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
  plugins: [
    new HtmlWebpackplugin({
      template: `./src/views/home/index.html`, // relative path to the HTML files
      filename: `index.html`, // output HTML files
      chunks: [`home`], // respective JS files
    }),
  ].concat(multipleHtmlPlugins),
  watch: true,
};
