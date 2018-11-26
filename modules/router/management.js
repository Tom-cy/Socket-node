// 获取fs模块
var fs = require("fs");
// 引入只查看目录文件夹的选项
var dir = require("../tools/dir.js");
function management(req, res) {
		// 读取文件夹
		fs.readdir("albums/" + req.session.username, function(err, arr) {
			res.render("management", {
				username: req.session.username,
				head_pic: req.session.head_pic,
				arr:dir(arr)
		})
	})
}

module.exports = management;