const app = require("express").Router();
const service = require("../Services/usersServices")


app.post("/register",service.register);

app.post("/login",service.login);


module.exports = app;



