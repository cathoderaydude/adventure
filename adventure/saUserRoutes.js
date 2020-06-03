﻿var express = require("express"),
    fs = require("fs"),
    path = require("path"),
    passport = require("passport"),
    localStrategy = require("passport-local").Strategy,
    svgCaptcha = require("svg-captcha"),
    middleware = require("./middleware.js"),
    formatting = require("./formatting.js");

var config, database, sitePages;

var restrictedRoute = middleware.restrictedRoute;
var urlencodedParser = middleware.bodyParser;
var server = express.Router();

server.get("/sa/enterUser", restrictedRoute("sa"), function (req, res) {
    res.render("saEnterUser", {});
});

server.post("/sa/redirectToUserEdit", restrictedRoute("sa"), urlencodedParser, function (req, res) {
    database.userByName(req.body.name, function (err, user) {
        if (err) {
            return res.status(500).render("error", {
                message: "There was an error fetching from the database."
            });
        } else if (user == null) {
            return res.status(404).render("error", {
                message: "There was no user."
            });
        } else {
            return res.redirect("/sa/user/" + formatting.binToHex(user.UserID));
        }
    });
});

server.get("/sa/user/:userId", restrictedRoute("sa"), function (req, res) {
    database.userById(formatting.hexToBin(req.params.userId), function (err, user) {
        if (err) {
            return res.status(500).render("error", {
                message: "There was an error fetching from the database."
            });
        } else if (user == null) {
            return res.status(404).render("error", {
                message: "There was no user."
            });
        } else {
            user.UserID = formatting.binToHex(user.UserID);
            res.render("saUser", {
                editingUser: user,
                userFlags: database.userFlags,
            });
        }
    });
});

server.post("/sa/user/changepw/:userId", restrictedRoute("sa"), urlencodedParser, function (req, res) {
    if (req.body && req.body.newPassword && req.body.newPasswordR) {
        var uuidAsBuf = formatting.hexToBin(req.params.userId);
        if (req.body.newPassword == req.body.newPasswordR) {
            database.userChangePassword(uuidAsBuf, req.body.newPassword, function (pwErr) {
                if (pwErr) {
                    return res.status(500).render("error", {
                        message: "There was an error changing the user's password."
                    });
                } else {
                    return res.redirect("/sa/user/" + req.params.userId);
                }
            });
        } else {
            return res.status(400).render("error", {
                message: "The new passwords don't match."
            });
        }
    } else {
        return res.status(400).render("error", {
            message: "The request was malformed."
        });
    }
});

server.post("/sa/user/edit/:userId", restrictedRoute("sa"), urlencodedParser, function (req, res) {
    // TODO: Extend as we extend editable profile options (none for now)
    if (req.body && req.body.email) {
        var uuidAsBuf = formatting.hexToBin(req.params.userId);
        var enabled = req.body.enabled ? "True" : "False";
        database.userEditProfile(uuidAsBuf, enabled, req.body.email, function (prErr) {
            if (prErr) {
                return res.status(500).render("error", {
                    message: "There was an error changing the user's profile."
                });
            } else {
                return res.redirect("/sa/user/" + req.params.userId);
            }
        });
    } else {
        return res.status(400).render("error", {
            message: "The request was malformed."
        });
    }
});

server.post("/sa/user/addFlag/:userId", restrictedRoute("sa"), urlencodedParser, function (req, res) {
    if (req.body && req.body.flag) {
        var uuidAsBuf = formatting.hexToBin(req.params.userId)
        database.userAddFlag(uuidAsBuf, req.body.flag, function(flErr) {
            if (flErr) {
                return res.status(500).render("error", {
                    message: "There was an error adding the flag."
                });
            } else {
                return res.redirect("/sa/user/" + req.params.userId);
            }
        });
    } else {
        return res.status(400).render("error", {
            message: "The request was malformed."
        });
    }
});

server.get("/sa/user/removeFlag/:userId/:flagName", restrictedRoute("sa"), urlencodedParser, function (req, res) {
    if (req.params.flagName) {
        var uuidAsBuf = formatting.hexToBin(req.params.userId)
        database.userRemoveFlag(uuidAsBuf, req.params.flagName, function (flErr) {
            if (flErr) {
                return res.status(500).render("error", {
                    message: "There was an error removing the flag."
                });
            } else {
                return res.redirect("/sa/user/" + req.params.userId);
            }
        });
    } else {
        return res.status(400).render("error", {
            message: "The request was malformed."
        });
    }
});

module.exports = function (c, d, p) {
    config = c
    database = d;
    sitePages = p;

    // init user flags once we're connected
    database.execute("SELECT * FROM `UserFlags`", [], function (ufErr, ufRes, ufFields) {
        // first, init userFlags
        database.userFlags = ufRes;
    });

    return server;
}