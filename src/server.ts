import App from "./app";
import HealthController from "./controllers/health";
import {BooksController} from "./controllers/books";

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

const app = new App(
    [new HealthController(), new BooksController()]
);
app.listen();

/** Error handling */
// app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
//     const error = new Error('Page NOT found');
//     res.status(404).json({message: error.message});
// });

// app.listen(index.server.port, () => {
//     logging.info(NAMESPACE, `Server is running in ${index.server.hostname}: ${index.server.port}`);
// });