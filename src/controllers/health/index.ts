import { Request, Response, NextFunction, Router} from "express";
import BaseController from "../BaseController";

class HealthController implements BaseController {
    public path: string = '/health';
    public router: Router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getHealthCheck);
    }

    private getHealthCheck(req: Request, res: Response) {
        // check for DB and all connected services
        res.status(200).json({message: 'All is well with HealthController!!!'});
    }
}

export default HealthController;