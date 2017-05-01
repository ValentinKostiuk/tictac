import * as Chalk from "chalk";
import {AppConfig} from "../shared/configuration/appConfig";

let express = require("express");
let app = express();
let url = require("url");
let server = require("http").createServer(app);
let io = require("socket.io")(server);

let allowedFolders = ["/app", "/resources", "/node_modules", "/shared"];
let allowedExtensions = ["html", "css", "js"];

let socketsRouter = require("./routers/socketsRouter")(server, io);

function escapeRegExp(str) {
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function getIsFolderAllowedRegExp() {
	let regexStr = "(^" + escapeRegExp("/") + "[^/]*$)|";
	for (let i = 0; i < allowedFolders.length; i++) {
		regexStr += "(^" + escapeRegExp(allowedFolders[i]) + ".*)|";
	}
	regexStr = regexStr.substring(0, regexStr.length - 1);
	return new RegExp(regexStr, "i");
}

function getIsExtensionAllowedRegExp() {
	let regexStr = "(^" + escapeRegExp("/") + "$)|";
	for (let i = 0; i < allowedExtensions.length; i++) {
		regexStr += "(\." + escapeRegExp(allowedExtensions[i]) + "$)|";
	}
	regexStr = regexStr.substring(0, regexStr.length - 1);
	return new RegExp(regexStr, "i");
}

let extensionsRegExp = getIsExtensionAllowedRegExp();
let foldersRegExp = getIsFolderAllowedRegExp();

function getIsValidPath(path) {
	//console.log(Chalk.blue(path), foldersRegExp.test(path), extensionsRegExp.test(path));
	return foldersRegExp.test(path) && extensionsRegExp.test(path);
}

function filterNotAllowedFiles(req, res, next) {
	let originalUrl = url.parse(req.originalUrl).path;

	if (getIsValidPath(originalUrl)) {
		next();
	} else {
		res.status(404).send("File not found");
	}
}

app.get("/*", filterNotAllowedFiles);

app.use("/", express.static("./"));

server.listen(AppConfig.appPort, AppConfig.appHost, function () {
	console.log(Chalk.bgGreen.gray("Example app listening on port "+ AppConfig.appPort +"!"));
});