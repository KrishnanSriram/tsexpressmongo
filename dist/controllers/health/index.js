"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class HealthController {
    constructor() {
        this.path = '/health';
        this.router = express_1.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.getHealthCheck);
    }
    getHealthCheck(req, res) {
        // check for DB and all connected services
        res.status(200).json({ message: 'All is well with HealthController!!!' });
    }
}
exports.default = HealthController;
//# sourceMappingURL=index.js.map