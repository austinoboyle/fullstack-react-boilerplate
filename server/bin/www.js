/**
 * Module dependencies.
 */
require("dotenv").config();
const api = require("../api");
let debug = require("debug")("server:server");
let http = require("http");
/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || "3000");

if (process.env.NODE_ENV === "production") {
    console.log("PROD");
    const app = require("../app");
    app.set("port", port);
    let server = http.createServer(app);
    server.listen(port);
    server.on("error", onError);
    server.on("listening", () => onListening(server, "server"));
}

api.set("port", port + 1);

/**
 * Create HTTP server.
 */

let apiServer = http.createServer(api);
apiServer.listen(port + 1);
apiServer.on("error", onError);
apiServer.on("listening", () => onListening(apiServer, "apiServer"));

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    console.log("ERROR", error);
    if (error.syscall !== "listen") {
        throw error;
    }

    let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(server, serverName) {
    let addr = server.address();
    let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    console.log(serverName + " is listening on " + bind);
}
