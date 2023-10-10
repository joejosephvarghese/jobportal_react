"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const body_parser_1 = __importDefault(require("body-parser"));
const connection_1 = __importDefault(require("./frameworkes/database/connection"));
const errorHandlingMiddleware_1 = __importDefault(require("./frameworkes/webserver/middleware/errorHandlingMiddleware"));
const routes_1 = __importDefault(require("./frameworkes/webserver/routes/routes"));
const express_2 = __importDefault(require("./frameworkes/webserver/express"));
const server_1 = __importDefault(require("./frameworkes/webserver/server"));
const socket_1 = __importDefault(require("./frameworkes/websocket/socket"));
const appError_1 = __importDefault(require("./utils/appError"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
// starting the server 
const server = http_1.default.createServer(app);
(0, server_1.default)(server).startServer();
// calling express configuration
(0, express_2.default)(app);
// const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://jobsync.online"]
}));
// socket connection
const io = new socket_io_1.Server(server, {
    cors: {
        origin: config_1.default.ORIGIN_PORT
    }
});
(0, socket_1.default)(io);
app.use(body_parser_1.default.json());
// Import and use your routes here
// connecting database
(0, connection_1.default)();
// ...
// routes
(0, routes_1.default)(app);
// error handling middleware
app.use(errorHandlingMiddleware_1.default);
app.all('*', (req, res, next) => {
    next(new appError_1.default('Not found', 404));
});
// ...
