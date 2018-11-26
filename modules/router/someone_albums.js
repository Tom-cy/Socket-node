// 查看某个人的相册
var fs = require("fs");
// 引入只查看目录文件夹的选项
var dir = require("../tools/dir.js");
function someone_albums(req, res) {
    // 获取目标用户
    var targetUsername = req.query.username;
    // 去物理磁盘中查询
    fs.readdir("albums/" + targetUsername, function(err, arr) {
        if(err) {
            res.redirect("/error?msg=读取物理磁盘失败");
            return;
        }
        var dirArr = dir(arr);
        res.render("someone_albums", {
            username: req.session.username,
            head_pic: req.session.head_pic,
            albumsArr: dirArr,
            targetUsername: targetUsername
        });
    })
}

module.exports = someone_albums;