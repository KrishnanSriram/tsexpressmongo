"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const health_1 = __importDefault(require("./controllers/health"));
const books_1 = require("./controllers/books");
// const app = express();
// const NAMESPACE = 'Server';
// app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
//    logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`, NAMESPACE);
//    next();
// });
/** Parse the body of the request */
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
/** Routes go here */
// app.use('/health', HealthRouter);
// app.get('/', (req: express.Request, res: express.Response) => {
//     res.status(200).json({message: 'Hello world'});
// })
const app = new app_1.default([new health_1.default(), new books_1.BooksController()]);
app.listen();
/** Error handling */
// app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
//     const error = new Error('Page NOT found');
//     res.status(404).json({message: error.message});
// });
// app.listen(index.server.port, () => {
//     logging.info(NAMESPACE, `Server is running in ${index.server.hostname}: ${index.server.port}`);
// });
//# sourceMappingURL=server.js.map