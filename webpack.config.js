const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: 'development',
	entry: './src/index.ts',
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './templates/index.html'),
			title: 'Threejs Boilerplate',
			minify: true,
			templateParameters: {
				//
			},
		}),
		new CopyPlugin({
			patterns: [
			  { from: "public/models", to: "models" },
			],
		}),
		// new BundleAnalyzerPlugin()
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
                test: /\.(jpg|png|gif|svg)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/images/'
                        }
                    }
                ]
            },
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                use: [
                    'raw-loader',
                    'glslify-loader'
                ]
            }
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
}
