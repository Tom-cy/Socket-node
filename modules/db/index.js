// 引入mongodb
var mongodb = require("mongodb");
// 获取连接客户端
var MongoClient = mongodb.MongoClient;
// 定义连接字符串
var connectStr = "mongodb://localhost:27017/";
// 定义连接数据库的代码
var connect = function(callback) {
	MongoClient.connect(connectStr, function(err, client) {
		if (err) {
			callback(err, null);
			return;
		}
		callback(null, client);
	})
}


module.exports = connect;