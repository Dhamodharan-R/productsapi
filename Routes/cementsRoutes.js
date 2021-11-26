const app = require("express").Router();
const service = require("../Services/cementsServices")

app.get("/",service.get)

app.post("/",service.post)

app.put("/:id",service.put)

app.delete("/:id",service.delete)


module.exports = app;