var express = require("express");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const todoRouter = require("./routers/todo.router");

var app = express();

mongoose
    .connect("mongodb://localhost/todos")
    .then(() => console.log("Connected to DB"))
    .catch(e => console.error(e));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
    app.use("/api/todos", todoRouter);
} else {
    app.use("/todos", todoRouter);
}

module.exports = app;
