const fs = require("fs")
 

function talk_with(req, res) {

   

        fs.readdir("face", function (err, arr) {
            res.render("talk_with", {
                username: req.session.username,
                head_pic: req.session.head_pic,
                face_arr: arr
            })
        })

       
}
module.exports = talk_with;