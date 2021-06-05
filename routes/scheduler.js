const express = require("express");

const scedulerRouter = express.Router();

const Router = function (app, mongoose, utils, worker) {
    const schedularController = require("../controller/schedular")(app, mongoose, utils, worker)

    scedulerRouter.post("/", schedularController.schedule);

    app.use("/api/scheduler", scedulerRouter);
}


module.exports = Router;