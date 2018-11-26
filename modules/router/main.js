// 获取connect
var connect = require("../db");

function main(req, res) {
    // 连接数据库
    connect(function(err, client) {
        if(err) {
            res.send({
                error: 1,
                data: "连接数据库失败"
            })
            return;
        }
        var db = client.db("albums");
        var users = db.collection("users");
        // 查询所有的用户
        users.find().toArray(function(err, arr) {
            client.close();
            if(err) {
                res.redirect("/error?msg=查询失败");
                return;
            }
            console.log(arr)
            // arr是所有用户的集合
            res.render("index", {
                username: req.session.username,
                head_pic: req.session.head_pic,
                userArr: arr
            })
        })
    })
}

module.exports = main;