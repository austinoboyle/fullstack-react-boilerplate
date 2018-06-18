const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const todoRouter = require("./routers/todo.router");

const app = express();

let CONNECTION_URI = "mongodb://localhost/todos";
if (process.env.NODE_ENV === "production") {
    const { MONGO_USER, MONGO_PASS, MONGO_URL } = process.env;
    CONNECTION_URI = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_URL}`;
}

if (process.env.NODE_ENV !== "test") {
    mongoose
        .connect(CONNECTION_URI)
        .then(() => console.log("Connected to DB"))
        .catch(e => console.error(e));
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if (process.env.NODE_ENV !== "test") {
    app.use(logger("dev"));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
    app.use("/api/todos", todoRouter);
} else {
    app.use("/todos", todoRouter);
}

module.exports = app;
