module.exports = {
    root: require("path").normalize(__dirname + "/.."),
    jwtPrivateKey: process.env.jwtPrivateKey,
    db: "mongodb://localhost/Insurance",
    port: process.env.port,
    requiresAuth: true,
    security: {
        REFRESH_TOK: 172800,
        ACCESS_TOK: 1800,
    },
    jobSchedulerHost: `localhost:${process.env.PORT}`
};