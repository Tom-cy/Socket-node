function socket(req, res) {
    res.render("socket", {
        username: req.session.username,
        head_pic: req.session.head_pic
    })
}

module.exports = socket;