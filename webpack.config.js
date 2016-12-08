var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, '_build');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
	entry: APP_DIR + '/main.jsx',
	output: {
		path: BUILD_DIR,
		filename: 'main.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?/,
				include: APP_DIR,
				loader: 'babel'
			},
			{
				test: /\.js?$/,
				loader: 'umd-compat-loader'
			}
		]
	}
};

module.exports = config;
