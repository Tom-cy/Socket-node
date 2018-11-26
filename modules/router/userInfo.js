function userInfo(req, res) {
	res.render("userInfo", {
		username: req.session.username,
		head_pic: req.session.head_pic
	})
}

module.exports = userInfo;