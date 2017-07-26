

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
webpackConfig = {  
	context: __dirname,  
	entry: {    
		bundle: './static/init.js',    
		styles: './static/main.scss'
		},  
	output: {    
		filename: '[name].js',    
		path: './static/build',    
		library: '[name]'  
		},  
	resolve: {    
		extensions: ['', '.js', '.jsx']  
		},  
	devtool: '#cheap-module-source-map',  
	module: {    
		loaders: [      {        
			test: /\.js/,        
			exclude: [/node_modules/],        
			loader: "babel-loader",        
			query: {          
				presets: ['es2015', 'react', 'stage-0', 'stage-1']        
				}      
			},      
			{
				test: /\.html$/, loader: "html"
				},      
			{
				test: /\.json/, 
				loader: "json"
				},      
			{ 
				test: /bootstrap\/dist\/js\/umd\//, 
				loader: 'imports?jQuery=jquery' 
				},      
			{        
				test: /\.scss$/,        
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!resolve-url!sass-loader?sourceMap')      
				},      // {      //   test: /\.css$/,      //   loader: ExtractTextPlugin.extract('style-loader', 'css-loader')      // }, 
     		{        
     			test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,        
     			loader: 'file-loader'      
     		},    ]  
     	},  
     	plugins: [    new ExtractTextPlugin('styles.css', 
     	{      
     		allChunks: true    
     	})  ]
     };
     module.exports = webpackConfig;