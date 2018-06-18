let express = require("express");
let path = require("path");
let favicon = require("serve-favicon");
let logger = require("morgan");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
const httpProxy = require("http-proxy");

const handleLoad = require("./middleware/handleLoad").default;

let app = express();

const apiProxy = httpProxy.createProxyServer({
    target: "http://localhost:" + String(Number(process.env.PORT) + 1) || 3001
});

app.use("/api", (req, res) => {
    apiProxy.web(req, res);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", handleLoad);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
} else {
    app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", handleLoad);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
