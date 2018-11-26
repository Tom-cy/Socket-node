const fs = require("fs")
// 引入数据库
var connect = require("../db");

 

function talk_with(req, res) {

    var targetname = req.session.username;
    connect(function (err, client) {
        if (err) {
            res.send({
                error: 1,
                data: "连接数据失败"
            })
            return;
        }
        // // 定位数据库---集合
        var db = client.db("albums");
        var imgInfo = db.collection("imgInfo");
        imgInfo.find({"username": targetname}).toArray(function (err, arr) {
            if (err) {
                res.send({
                    error: 1,
                    data: "读取数据失败"
                })
                return;
            }
       

            res.send({
                dir: "albums",
                error:0,
                data:arr
            })
          
        })

    })
}
module.exports = talk_with;