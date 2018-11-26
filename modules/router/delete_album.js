// 引入fs模块
var fs = require("fs");
// 引入数据库
var connect = require("../db")
// 引入工具模块中的删除文件夹模块
var rm = require("../tools/rm");

module.exports = function(req, res) {
	console.log(req)
	// console.log(1);
	// 获取用户名
	var username = req.session.username;
	// 获取前端发送的相册名
	var album_name = req.query.album_name;

	// 连接数据库
	connect(function(err, client) {

		if(err) {
			res.send({
				error: 2,
				data: "连接数据库失败"
			});
			return;
		}

		// // 定义删除参数
		var query = {
			username: username,
			album_name: album_name,

		}
		// 定位数据库
		var db = client.db("albums");
		// 定位集合
		var imgInfo = db.collection("imgInfo");
		// 调用删除方法
		imgInfo.remove(query, function(err, result) {
			client.close();
			if (err) {
				res.send({
					error: 3,
					data: "删除数据库信息失败"
				});
				return;
			}
		})
	
	})
	// 删除
	try {
		rm("albums/" + username + "/" + album_name);

	} catch(e) {
		res.send({
			error: 1,
			data: "删除失败"
		});
		return;
	}
	res.send({
		error: 0,
		data: "删除成功"
	});	
}