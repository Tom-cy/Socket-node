// 获取fs模块
var fs = require("fs");
//  引入数据库

module.exports = function(req, res) {
	// 获取前端传递的数据
	var album_name = req.query.album_name;
	console.log(album_name)
	// 创建相册 
	var arr = fs.readdirSync("albums/" + req.session.username);
	// console.log(arr);
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] === album_name) {
			res.send({
				error: 1,
				data: "相册名重复"
			});
			return;
		}
	}
	fs.mkdir("albums/" + req.session.username + "/"+ album_name, function(err, data) {
		console.log(err,data);
		if(err) {
			res.send({
				error: 2,
				data: "创建相册失败"
			}) 
			return;
		}
		res.send({
			error: 0,
			data: "创建相册成功",
		})

	})
}