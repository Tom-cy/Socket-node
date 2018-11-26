var fs = require("fs");
var connect = require("../db");

function regist(req, res) {
	// 获取用户名和密码
	var username = req.body.username;
	var password = req.body.password;

	// 创建本地用户（建立文件夹）
	fs.mkdir("./albums/" + username, function(err) {
		if(err) {
			res.send({
				error: 1,
				data: "新建用户文件夹失败"
			})
			return;
		}
		// 创建文件夹成功过后把相应的数据添加到数据库当中
		// 定义数据
		var query = {
			username: username,
			password: password,
			sex: "",
			age: "",
			job: "",
			head_pic: "/web/imgs/default.jpg"
		}
		// 连接数据库
		connect(function(err, client) {
			if(err) {
				res.send({
					error: 2,
					data: "连接数据库失败"
				})
				return;
			}
			var db = client.db("albums");
			var users = db.collection("users");
			users.insertOne(query, function(err, result) {
				client.close();
				if (err) {
					res.send({
						error: 3,
						data: "上传数据失败"
					});
					return;
				}
				res.send({
					error: 0,
					data: "成功"
				})
			})
		})
	})
}

module.exports = regist;