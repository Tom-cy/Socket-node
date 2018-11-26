// 引入fs模块
var fs = require("fs");
// 引入formidable
var formidable = require("formidable");
// 引入db
var connect = require("../db");

function uploadFile(req, res) {
	// 获取当前登录用户
	var username = req.session.username;
	//  解析
	var form = new formidable();
	// 设置上传路径
	form.uploadDir = "./uploads";
	// 定义数组
	var imgArr = [];
	// 监听file事件
	form.on("file", function(key, value) {
		imgArr.push(value);
	})
	// 解析
	form.parse(req, function(err, fields, files) {
		if(err) {
			res.send({
				error: 1,
				data: "解析图片信息失败" 
			});
			return;
		}
		// 获取相册名称
		var album_name = fields.album_name;

		// 定义集合
		var imgInfoArr = [];
		// 循环
		for(var i = 0; i < imgArr.length; i++) {
			// 定义老路径
		    var oldPath = imgArr[i].path;
		    // 定义新路径
		    var newPath = "albums/" + username + "/" + album_name + "/" + imgArr[i].name;
		    imgInfoArr.push({
		    	username: username,
		    	album_name: album_name,
		    	imgname: imgArr[i].name
		    })
		    // 重命名
		   fs.renameSync(oldPath, newPath);
		}
		// 连接数据库
		connect(function(err, client) {
			if(err) {
	    		res.send({
	    			error: 2,
	    			data: "连接数据库失败"
	    		});
	    		return;
	    	}
	    	//确定数据库
	    	var db = client.db("albums");
	    	// 确定集合 
	    	var imgInfo = db.collection("imgInfo");
	    	//  调用方法插入数据库
	    	imgInfo.insertMany(imgInfoArr, function(err, result) {
	    		console.log(result);
	    		client.close();
				if (err) {
					res.send({
						error: 3,
						data: "插入数据库失败"
					});
					return;
				}
				res.send({
					error: 0,
					data: "上传成功"
				})
	    	})

		})

	})

}


module.exports = uploadFile;