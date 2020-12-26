"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./logger"));
class App {
    constructor(controllers) {
        this.app = express_1.default();
        this.NAMESPACE = "App";
        this.initializeMiddlewares();
        this.initializeMongoose();
        this.initializeControllers(controllers);
    }
    initializeMiddlewares() {
        // body parser
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        // initialize logging
        this.initializeAppLog();
    }
    initializeAppLog() {
        this.app.use((req, res, next) => {
            logger_1.default.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`, this.NAMESPACE);
            next();
        });
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
    initializeMongoose() {
        logger_1.default.info(this.NAMESPACE, "Connect to MongoDB!!!");
        mongoose_1.default.connect(config_1.default.mongo.url, config_1.default.mongo.options)
            .then((result) => {
            logger_1.default.info(this.NAMESPACE, 'Mongo Connected');
        })
            .catch((error) => {
            logger_1.default.error(this.NAMESPACE, error.message, error);
        });
    }
    listen() {
        this.app.listen(config_1.default.server.port, () => {
            logger_1.default.info(this.NAMESPACE, `Server is running in ${config_1.default.server.hostname}: ${config_1.default.server.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map