const webpack = require("webpack");
// 引入基础配置文件
const webpackBase = require("./webpack.config.base");
// 引入 webpack-merge 插件
const webpackMerge = require("webpack-merge");
// 使用 node 里的 os 模块
const os = require("os");
// 引入配置文件
const config = require("./config");
// 合并配置文件
module.exports = webpackMerge(webpackBase,{
    mode:'development',
    module:{
        rules:[
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                  'style-loader',
                  'css-loader'
                ],
            },
        ]
    },
    plugins:[
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.ContextReplacementPlugin(
        //     // 需要被处理的文件目录位置
        //     /app\/js\/js\/vendor\/moment[\/\\]locale/,
        //     // 正则匹配需要被包括进来的文件
        //     /app\/js\/js\/vendor\/(en|zh-cn)\.js/,
        // ),
    ],
    // 配置 webpack-dev-server
    devServer:{
        // 设置代理
        proxy:{
            '/APP-admin':{
                target: config.apiPath,
                // pathRewrite: { '^/APP-admin' : '/AlphaGu-admin' },
                pathRewrite: { '^/APP-admin' : '/APP-admin' },
                changeOrigin: true,   // target是域名的话，需要这个参数，
                secure: false    // 设置支持https协议的代理
            }
        },
        // 项目根目录 启动的首页
        contentBase:config.devServerOutputPath,
        // 错误、警告展示设置
        overlay:{
            errors:true,
            warnings:true
        },
        hot: true,
        port: 2223
        // host: getNetWorkIp()
    }
});
function getNetWorkIp() {
    let needHost = ''; // 打开的host
	try {
		// 获得网络接口列表
		let network = os.networkInterfaces();
		for (let dev in network) {
			let iface = network[dev];
			for (let i = 0; i < iface.length; i++) {
				let alias = iface[i];
				if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
					needHost = alias.address;
				}
			}
		}
	} catch (e) {
		needHost = 'localhost';
	}
	return needHost;
}