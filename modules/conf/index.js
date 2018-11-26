// 引入body-parser
var body_parser = require("body-parser");
// 引入session
var session = require("express-session");
// connect-mongo
var connect = require("connect-mongo");
var MongoStore = connect(session);
var express = require("express");


// 当前模块用于配置app的 向外暴露一个函数 该函数接收一个参数 就是app
function conf(app) {
	// 配置body-parser
	app.use(body_parser.urlencoded({extended: false}));
	// 配置session
	app.use(session({
		secret: "faiowfnoiewanfoanfonewfoinewaoifoewjf",
		resave: false,
		saveUninitialized: true,
		store: new MongoStore({url: "mongodb://localhost:27017/session"})
	}))
	// 配置模板引擎
	app.set("view engine", "ejs");

	// 静态服务器
	app.use("/face/", express.static("./face"))
	app.use("/web/", express.static("./web"));
    app.use("/albums/", express.static("./albums"));
}


// 暴露conf函数
module.exports = conf;