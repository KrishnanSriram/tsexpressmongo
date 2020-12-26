import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import express from "express";
import config from './config';
import logging from './logger';
import BaseController from "./controllers/BaseController";

class App {
    public app: express.Application;
    private readonly NAMESPACE: string;

    constructor(controllers: BaseController[]) {
        this.app = express();
        this.NAMESPACE = "App";
        this.initializeMiddlewares();
        this.initializeMongoose();
        this.initializeControllers(controllers);

    }

    private initializeMiddlewares() {
        // body parser
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        // initialize logging
        this.initializeAppLog();
    }

    private initializeAppLog() {
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`, this.NAMESPACE);
            next();
        });
    }

    private initializeControllers(controllers: BaseController[]) {
        controllers.forEach((controller: BaseController) => {
            this.app.use('/', controller.router);
        })
    }

    private initializeMongoose() {
        logging.info(this.NAMESPACE, "Connect to MongoDB!!!");
        mongoose.connect(config.mongo.url, config.mongo.options)
            .then((result) => {
                logging.info(this.NAMESPACE, 'Mongo Connected');
            })
            .catch((error) => {
                logging.error(this.NAMESPACE, error.message, error);
            });
    }

    public listen() {
        this.app.listen(config.server.port, () => {
            logging.info(this.NAMESPACE, `Server is running in ${config.server.hostname}: ${config.server.port}`);
        });
    }
}

export default App;