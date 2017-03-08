module.exports = {
	devtool:"eval-source-map",
	entry:__dirname+"/src/js/root.js", //入口文件路径
	output:{  // 出口文件路径
		path:__dirname+"/build",  //出口路径
		filename:"bundle.js"   //编译周的文件名称
	},

	module:{
		loaders:[
			//配置json
			{
				test:/\.json$/,
				loader:"json-loader"
			},
			{
				test:/\.js$/,
				exclude:"node_modules",
				loader:"babel-loader",
				query:{
					presets:["es2015","react"]
				}
			},
			{
				test:/\.css$/,
				loader:"style-loader!css-loader"
			},
			{
				test:/\.(png|jpg)$/,
				loader:"file-loader?name=img/[hash:8].[name].[ext]"
			}
		]
	}
}