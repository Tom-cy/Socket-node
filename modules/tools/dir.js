module.exports = function(dirArr) {
    for(var i = 0; i < dirArr.length; i++) {
        var reg = /\.[0-9a-zA-Z]+/;
        if(reg.test(dirArr[i])) {
            dirArr.splice(i, 1);
            i--;
        }
    }
    return dirArr;
}