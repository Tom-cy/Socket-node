// 获取gm模块
var gm = require("gm");
function caijian(req, res) {
	// 获取宽高xy
	var x = req.query.x;
	var y = req.query.y;
	var w = req.query.w;
	var h = req.query.h;
	// 裁剪当前的头像
	console.log(req.session.head_pic)
	gm(req.session.head_pic).crop(w, h, x, y).write(req.session.head_pic, function(err) {
		if (err) {
			res.send({
				error: 1,
				data: "裁剪失败"
			});
			return;
		}
		res.send({
			error: 0,
			data: "裁剪成功"
		})
	})
}
module.exports = caijian;