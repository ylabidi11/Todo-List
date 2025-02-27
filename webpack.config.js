// webpack.config.js
// npm install --save-dev webpack webpack-cli
// For downloading webpack to begin with
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // For bundling js files
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    // npm install --save-dev webpack-dev-server
    // Automate it

    // To know exact errors in the dev code
    devtool: "eval-source-map",
    // Auto restart when detect changes into our js bundler
    devServer: {
        watchFiles: ["./src/template.html"],
    },
    // npm install --save-dev html-webpack-plugin
    // For handling html files
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
        }),
    ],
    // npm install --save-dev style-loader css-loader
    // For css styles that are imported in js files (I think)
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            // npm install --save-dev html-loader
            // In the middle of the html file there are images
            // For handling img imported in js files
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
};

// Once set up, npx webpack serve will host our 
// web page on http://localhost:8080/, which 
// we can open in our browser and start working!