const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const path = require("path");

module.exports = (env, argv) => {
    const isProduction = argv.mode === "production" || process.env.NODE_ENV === "production";

    const config = {
        entry: {
            main: "./src/js/index.js"
        },

        output: {
            filename: "./js/bundle-[name].js",
            path: path.resolve(__dirname, "./dist")
        },

        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/i,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        { loader: "css-loader" },
                        { loader: "postcss-loader" },
                        {
                            loader: "sass-loader",
                            options: {
                                sassOptions: {
                                    indentWidth: isProduction ? 2 : 4,
                                    outputStyle: isProduction ? "compressed" : "expanded",
                                    precision: 6
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.(gif|jpe?g|png|svg)$/i,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                context: "src",
                                name: "[path][name]_[contenthash].[ext]",
                                publicPath: "../"
                            }
                        }
                    ]
                },
                {
                    test: /\.(eot|otf|ttf|woff|woff2)$/i,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                context: "src",
                                name: "[path][name]_[contenthash].[ext]",
                                publicPath: "../"
                            }
                        }
                    ]
                }
            ]
        },

        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            drop_console: true
                        }
                    },
                }),
            ],
        },

        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery"
            }),
            new MiniCssExtractPlugin({
                filename: "./css/style.css"
            }),
            new CopyPlugin([
                {
                    from: "images",
                    to: "images/[path][name].[ext]",
                    context: "src",
                    ignore: ["compiled/*"]
                }
            ])
        ]
    }

    return config;
};
