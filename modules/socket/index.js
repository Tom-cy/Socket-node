// 引入socket.io
var socket = require("socket.io");

// 引入http
var http = require("http");

// 定义数组 存储对象
var arr = [];
// // // 定义方法  查询id
var findUserById = function (id) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            return arr[i];
        }
    }
}
module.exports = function (app) {
    // 转换为原生的服务器
    var server = http.Server(app);

    var io = socket(server);
    // 建立连接监听事件
    io.on("connect", function (socket) {
        // 监听报道事件
        socket.on("coming", function (msg) {
            //  ID唯一
            msg.id = socket.id;

            //  每触发一次进入数组
            arr.push(msg);

            io.sockets.emit("someonelogin", arr)
        })

        // 监听离开事件
        socket.on("disconnect", function (msg) {
            for (var i = 0; i < arr.length; i++) {
                if (socket.id === arr[i].id) {
                    arr.splice(i, 1);
                    break;
                }
            }

        })



        // 监听msg事件
        socket.on("msg", function (text) {
            // 获取当前用户的socket的id
            var id = socket.id;
            // 查询id
            var obj = findUserById(id);
            var myDate = new Date();
            var mytime = myDate.toLocaleTimeString();
            // 通知所有人
            io.sockets.emit("listen", {
                username: obj.username,
                head_pic: obj.head_pic,
                text: text,
                mytime: mytime
            })
        })
    })

    return server;

}