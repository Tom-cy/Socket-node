var fs = require("fs");
var connect = require("../db");

function delete_pic(req, res) {
    var src = req.query.src;
    // 分割src
    var arr = src.split("/");
    var username = arr[1];
    var album_name = arr[2];
    var imgname = arr[3];
    // 删除物理磁盘文件
    fs.unlink(src, function(err) {
        if(err) {
            res.send({
                error: 1,
                data: "删除失败"
            })
            return;
        }
        // 删除数据库信息
        connect(function(err ,client) {
            if (err) {
				res.send({
					error: 2,
					data: "连接数据库失败"
				});
				return;
            }
            // 定位数据库
			var db = client.db("albums");
			// 定位集合
            var imgInfo = db.collection("imgInfo");
            // 定义删除参数
            var query = {
				username: username,
				album_name: album_name,
				imgname: imgname
            }
            console.log(query)
            imgInfo.remove(query, function(err, result) {
				if (err) {
					res.send({
						error: 3,
						data: "删除数据库信息失败"
					});
					return;
				}
				if (result.result.ok === 1) {
					res.send({
						error: 0,
						data: "删除成功"
					});
					return;
				}
				res.send({
					error: 4,
					data: "删除未成功"
				})
			})
        })
    })
}

module.exports = delete_pic;