const path = require("path");
// 引入插件
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 引入多页面文件列表
const config = require("./config");
// 通过 html-webpack-plugin 生成的 HTML 集合
let HTMLPlugins = [];
// 入口文件集合
let Entries = {};
var webpack = require('webpack');
config.HTMLDirs.forEach((page) => {
    const htmlPlugin = new HTMLWebpackPlugin({
    filename: `${page}.html`, //生成的html存放路径，相对于path
    template: path.resolve(__dirname, `../app/html/${page}.html`), //html模板路径
    inject: 'body', //js插入的位置，true/'head'/'body'/false
    hash: true, //为静态资源生成hash值
    chunks: ['vendors', page,'utils'],//需要引入的chunk，不配置就会引入所有页面的资源
    minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
    }

    });
    HTMLPlugins.push(htmlPlugin);
    Entries[page] = path.resolve(__dirname, `../app/js/${page}.js`);
});
module.exports = {
    mode:'production',
    entry: Entries,
    output: {
        filename:'js/[name].min.js',
        chunkFilename: "js/[chunkhash].chunk.js",
        path: path.resolve(__dirname, "../dist")
    },
    plugins: [
        // 自动清理 dist 文件夹
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name].[chunkhash].css',
            // chunkFilename: 'css/[name].[chunkhash].css',
            ignoreOrder: false,
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jQuery",
            "window.jQuery": "jquery"
        }),
        // 自动生成 HTML 插件
        ...HTMLPlugins,

        //   复制静态资源
        new CopyWebpackPlugin([{
            from:'./app/assets',
            to:'./assets',
            toType:'dir'
        }])
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /assets|node_modules|js[\/]js/,
                options: {
                    presets: ["@babel/preset-env"]
                }
            },
            {
                test: /\.css$/,
                    loader: [MiniCssExtractPlugin.loader,'css-loader']
                // use: [
                //   {
                //     loader: MiniCssExtractPlugin.loader,
                //     options: {
                //       publicPath: '../css/'
                //     }
                //   },
                //   MiniCssExtractPlugin.loader,
                //   'css-loader'
                // ],
            },
            {
                test: /\.html$/,
                use:['html-withimg-loader'],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader?name=./img/[name].[ext]',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        // 打包生成文本的名字
                        name: "[name].[ext]",
                        // 文本的输出路径
                        outputPath: config.fontOutputPath
                    }
                }
            },

        ],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {   // 抽离第三方插件
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor',  // 打包后的文件名，任意命名
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10
                },
                utils: { // 抽离自己写的公共代码，utils这个名字可以随意起
                //chunks表示哪些代码需要优化，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为async
                    chunks: 'initial',
                    name: 'utils',  // 任意命名
                    minSize: 0    // 只要超出0字节就生成一个新包
                },
                // styles: {
                //     test: /[\\/]common[\\/].+\.css$/,
                //     name: 'style',
                //     chunks: 'all',
                //     enforce: true
                // },
            }
        },
    },
    resolve: {
        // 别名
        alias: {
            $: '../app/js/jquery.min.js',
            jQuery: '../app/js/jquery.min.js'
        },
        // 省略后缀
        extensions: ['.js', '.json', '.css']
    },
};
