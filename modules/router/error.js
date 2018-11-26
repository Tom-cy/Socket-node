function error(req, res) {
	var msg = req.query.msg;
	res.render("error", {
		msg: msg
	})
}
module.exports = error;