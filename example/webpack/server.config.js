const path = require('path');
const sveltePreprocessVars = require('svelte-preprocess-vars');

const config = require('sapper/webpack/config.js');
const pkg = require('../package.json');
const variablesPath = path.resolve('../app/shared-variables.js');

module.exports = {
	entry: config.server.entry(),
	output: config.server.output(),
	target: 'node',
	resolve: {
		extensions: ['.js', '.json', '.html'],
		mainFields: ['svelte', 'module', 'browser', 'main']
	},
	externals: Object.keys(pkg.dependencies),
	module: {
		rules: [
			{
				test: /\.html$/,
				use: {
					loader: 'svelte-loader',
					options: {
						css: false,
						generate: 'ssr',
            preprocess: sveltePreprocessVars(variablesPath)
          }
				}
			}
		]
	},
	mode: process.env.NODE_ENV,
	performance: {
		hints: false // it doesn't matter if server.js is large
	}
};