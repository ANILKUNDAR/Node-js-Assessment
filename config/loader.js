var fs = require("fs");
const config = require("./config");

module.exports = function (app, mongoose, utils) {
    require("./db")();

    var modelPath = config.root + "/models";
    var routePath = config.root + "/routes";

    fs.readdirSync(modelPath).forEach(function (file) {
        console.log("Loading model : " + file);
        require(modelPath + "/" + file + "/schema.js")(mongoose, utils);
    });
    console.log("")
    fs.readdirSync(routePath).forEach(function (file) {
        console.log("Loading routes : " + file);
        require(routePath + "/" + file)(app, mongoose, utils);
    });
    console.log("")
}