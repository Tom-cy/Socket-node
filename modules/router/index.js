// 定义router
var router = require("express").Router();

var regist = require("./regist");
var login = require("./login");
var error = require("./error");
var main = require("./main");
var userInfo = require("./userInfo");
var management = require("./management");
var someone_albums = require("./someone_albums");
var someone_pictures = require("./someone_pictures");
var checkName = require("./checkName");
var head_pic = require("./head_pic");
var caijian = require("./caijian");
// 引入create函数
var create = require("./create");
//引入show_album_imgs
var show_album_imgs = require("./show_album_imgs");
// 引入uploadFile函数
var uploadFile = require("./uploadFile");
// 引入delete_album函数
var delete_album = require("./delete_album");
// 引入删除图片
var delete_pic = require("./delete_pic");
// 聊天
var talk_with = require("./talk_with");
var talk_with_two = require("./talk_with_two");
 

// 引入匹配检测用户名的工具函数
var checkNameUrl = require("../tools/checkNameUrl");
// 未登陆时的拦截路由
router.get("*", function(req, res, next) {
	var url = req.originalUrl;
	var result = checkNameUrl(url);
	if(!req.session.username && !result) {
		res.redirect("/web/html/login.html");
	}else {
		next();
	}
})
router.get("/main", main);
router.get("/caijian", caijian);
router.post("/head_pic", head_pic);
router.get("/management", management);
router.get("/error", error);
router.post("/login", login);
router.post("/regist", regist);
router.get("/userInfo", userInfo);
router.get("/someone_albums", someone_albums);
router.get("/someone_pictures", someone_pictures);
router.get("/checkName", checkName);
router.get("/create", create);
router.get("/show_album_imgs", show_album_imgs);
router.post("/uploadFile" ,uploadFile);
router.get("/delete_album", delete_album);
router.get("/delete_pic", delete_pic);

router.get("/talk_with", talk_with);
router.get("/talk_with_two", talk_with_two);



router.get("/web/index.html", function(req, res) {
	res.redirect("/main")
})




// 暴露router
module.exports = router;