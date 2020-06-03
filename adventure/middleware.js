﻿var bodyParser = require("body-parser"),
    multer = require("multer");

function restrictedRoute(flag) {
    return function (req, res, next) {
        if (req.user) {
            if (flag == null || req.user.UserFlags.some(function (x) { return x.FlagName == flag; })) {
                next();
            } else {
                return res.status(403).render("error", {
                    message: "You aren't allowed to access this route."
                });
            }
        } else {
            req.flash("warning", "You need to log in to access this route.");
            return res.redirect("/user/login?target=" + res.locals.loginRedirectTarget);
        }
    };
}

var multerStorage = multer.memoryStorage();
var uploadParser = multer({
    storage: multerStorage,
});
var bodyParser = bodyParser.urlencoded({ extended: false });

module.exports = {
    restrictedRoute: restrictedRoute,
    bodyParser: bodyParser,
    uploadParser: uploadParser,
};