var fs = require("fs");


function del(dirPath) {
	// 读取该文件夹
	var arr = fs.readdirSync(dirPath)
	// 循环
	for(var i = 0; i < arr.length; i++) {
		var state = fs.statSync(dirPath + "/" + arr[i]);
		// console.log(dirPath + "/" + arr[i] + (state.isDirectory() ? "是":"不是") + "一个文件夹");
		if (state.isDirectory()) {
			del(dirPath + "/" + arr[i]);
		} else {
			fs.unlinkSync(dirPath + "/" + arr[i])
		}
	}
	// 最后删除文件夹 
	fs.rmdirSync(dirPath);
}

module.exports = del;