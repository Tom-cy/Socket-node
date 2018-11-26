// 引入数据库函数
var connect = require("../db");

function checkName(req, res) {
    // 获取传来的用户名
    var username = req.query.username;
    // 连接数据库查看是否存在
    connect(function(err, client) {
        if(err) {
            res.send({
                error: 1,
                data: "连接数据库失败"
            })
            return;
        }
        // 连接成功则打开数据库
        var db = client.db("albums");
        var users = db.collection("users");
        // 使用mongo中的方法进行查看
        users.findOne({username: username}, function(err, result) {
            // 先关闭数据库
            client.close();
            if(err) {
                res.send({
                    error: 2,
                    data: "查看数据库数据失败！"
                })
                return;
            }
            if(result) {
                res.send({
                    error: 3,
                    data: "该用户名已存在！"
                })
                return;
            }
            res.send({
                error: 0,
                data: "恭喜，该用户名可用！"
            })
        })
    })
}

module.exports = checkName;