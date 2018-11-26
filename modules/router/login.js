var connect = require("../db");
function login(req, res) {
	// 获取前端传过来的数据 连接数据库 查询
	var username = req.body.username;
	var password = req.body.password;
	connect(function(err, client) {
		if (err) {
			res.send({
				error: 1,
				data: "连接数据库失败"
			});
			return;
		}
		var db = client.db("albums");
		var users = db.collection("users");
		users.findOne({username: username, password: password}, function(err, result) {
			client.close();
			if (err) {
				res.redirect("/error?msg=" + "查询数据失败");
				return;
			}
			if (result) {
				req.session.username = username;
				req.session.head_pic = result.head_pic;
				res.send({
					error: 0,
					data: "帐号密码正确"
				})
			} else {
				res.send({
					error: 2,
					data: "帐号或密码错误"
				})
			}
		})
	})
}
module.exports = login;