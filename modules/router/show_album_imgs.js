//引入数据库
// var connect = require("../db");
// 引入fs模块
var fs = require("fs");
function show_album_imgs(req, res) {
	//获取相册名称
	var album_name = req.query.album_name;

	fs.readdir("albums/" + req.session.username + "/" + album_name, function(err, arr) {
		if(err) {
			res.send({
				error: 1,
				data: "读取图片失败"
			});
			return;
		}
		var arr1 = arr.map(function(value) {
			return "albums/" + req.session.username + "/" + album_name + "/" + value;
		})
		
		res.send({
			error: 0,
			data: arr1
		})
	})
}

module.exports = show_album_imgs;