module.exports = function checkNameUrl(url) {
    var reg = /^\/checkName?/;
    if (reg.test(url)) {
        return true;
    }
    return false;
}