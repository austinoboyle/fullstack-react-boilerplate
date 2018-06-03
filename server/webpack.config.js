const nodeExternals = require("webpack-node-externals");
const path = require("path");
const autoprefixer = require("autoprefixer");

module.exports = {
    target: "node",
    context: __dirname,
    devtool: "source-map",
    node: {
        __filename: false,
        __dirname: false
    },
    externals: [nodeExternals()],
    entry: {
        server: "./bin/www.js"
    },
    output: {
        path: __dirname,
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    require.resolve("./loaders/replace-local-with-default.js"),
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: "[name]_[local]__[hash:base64:4]",
                            context: path.join(__dirname, "../client"),
                            importLoaders: 1
                        }
                    },
                    "sass-loader"
                ]
            }
        ]
    }
};
