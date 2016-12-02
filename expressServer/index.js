var express = require('express');
var app = express();
var url = require('url');
var allowedFolders = ['/app', '/resources', '/node_modules'];
var allowedExtensions = ['html', 'css', 'js'];
function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
function getIsFolderAllowedRegExp() {
    var regexStr = '(^' + escapeRegExp('/') + '[^/]*$)|';
    for (var i = 0; i < allowedFolders.length; i++) {
        regexStr += '(^' + escapeRegExp(allowedFolders[i]) + '.*)|';
    }
    regexStr = regexStr.substring(0, regexStr.length - 1);
    return new RegExp(regexStr, 'i');
}
function getIsExtensionAllowedRegExp() {
    var regexStr = '(^' + escapeRegExp('/') + '$)|';
    for (var i = 0; i < allowedExtensions.length; i++) {
        regexStr += '(\.' + escapeRegExp(allowedExtensions[i]) + '$)|';
    }
    regexStr = regexStr.substring(0, regexStr.length - 1);
    return new RegExp(regexStr, 'i');
}
var extensionsRegExp = getIsExtensionAllowedRegExp();
var foldersRegExp = getIsFolderAllowedRegExp();
function getIsValidPath(path) {
    return foldersRegExp.test(path) && extensionsRegExp.test(path);
}
function filterNotAllowedFiles(req, res, next) {
    console.log(req.originalUrl);
    var originalUrl = url.parse(req.originalUrl).path;
    if (getIsValidPath(originalUrl)) {
        next();
    }
    else {
        res.status(404).send('File not found');
    }
}
app.get('/*', filterNotAllowedFiles);
app.use('/', express.static('./'));
app.listen(3003, function () {
    console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=index.js.map