// 引入fs模块
var fs = require("fs");
// 引入数据库
var connect = require("../db");

function someone_pictures(req, res) {
    var username = req.query.username;
    var album_name = req.query.album_name;
    connect(function(err, client) {
        if(err) {
            res.redirect("/error?msg=连接数据库失败")
            return;
        }
        var db = client.db("albums");
        var imgInfo = db.collection("imgInfo");
        var query = {
            username: username,
            album_name: album_name
        }
        imgInfo.find(query).toArray(function(err, arr) {
			client.close();
			if (err) {
				res.redirect("/error?msg=查询失败");
				return;
			}
			console.log(arr)
			// arr是所有用户的信息集合
			res.render("someone_pictures", {
                username: req.session.username, 
                head_pic: req.session.head_pic,
                imgArr: arr
			})
		})
    })
}

module.exports = someone_pictures;