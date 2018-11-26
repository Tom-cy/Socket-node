// 引入express
var express = require("express");
// 搭建服务器
var app = express();

// 引入配置函数
var conf = require("./modules/conf");
// 引入路由模块
var router = require("./modules/router");
// 引入socket
var socket = require("./modules/socket");

// 使用配置函数进行配置
conf(app);
// 应用路由
app.use(router);
// 应用socket
var server = socket(app);


// 监听服务器
server.listen(3000);