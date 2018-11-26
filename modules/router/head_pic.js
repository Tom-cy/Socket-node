var fs = require("fs");
var formidable = require("formidable");
// 引入数据库
var connect = require("../db");
function head_pic(req, res) {
	var form = new formidable();
	form.uploadDir = "./uploads";
	// 解析
	form.parse(req, function(err, fields, files) {
		if (err) {
			res.send({
				error: 1,
				data: "解析失败"
			});
			return;
		}
		// 路径
		var oldPath = files.head_pic.path;
		var newPath = "albums/" + req.session.username + "/" + files.head_pic.name;
		fs.rename(oldPath, newPath, function(err) {
			if (err) {
				res.send({
					error: 2,
					data: "重命名失败"
				});
				return;
			}
			connect(function(err, client) {
				if (err) {
					res.send({
						error: 3,
						data: "连接数据库失败"
					});
					return;
				}
				console.log(newPath)
				// 定位数据库
				var db = client.db("albums");
				var users = db.collection("users");
				users.updateOne({username: req.session.username}, {$set: {head_pic: newPath}}, function(err, result) {
					client.close();
					if (err) {
						res.send({
							error: 4,
							data: "上传失败"
						});
						return;
					}
					req.session.head_pic = newPath;
					res.send({
						error: 0,
						data: newPath
					})
			})
		})
		})
		
	})
}

module.exports = head_pic;