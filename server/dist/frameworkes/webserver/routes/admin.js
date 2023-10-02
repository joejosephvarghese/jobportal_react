"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authService_1 = require("../../services/authService");
const authServiceInterface_1 = require("../../../app/services/authServiceInterface");
const adminDbRepository_1 = require("../../../app/repositories/adminDbRepository");
const adminRepoMongoDB_1 = require("../../database/mongoDb/repositories/adminRepoMongoDB");
const adminControllers_1 = __importDefault(require("../../../adapters/controllers/adminControllers"));
const authenticationMiddleware_1 = __importDefault(require("../middleware/authenticationMiddleware"));
const roleMiddleware_1 = __importDefault(require("../middleware/roleMiddleware"));
const adminRoleCheckMiddleware = (0, roleMiddleware_1.default)('admin');
const adminRouter = () => {
    const route = express_1.default.Router();
    const controller = (0, adminControllers_1.default)(authServiceInterface_1.authServiceInterface, authService_1.authService, adminDbRepository_1.adminDbRepository, adminRepoMongoDB_1.adminRepositoryMongoDB);
    route.post("/login", controller.adminLogin);
    route.get("/get-all-users", authenticationMiddleware_1.default, adminRoleCheckMiddleware, controller.adminGetAllUsers);
    route.get("/get-all-employers", authenticationMiddleware_1.default, adminRoleCheckMiddleware, controller.adminGetAllEmployers);
    route.post("/block-user/:id", authenticationMiddleware_1.default, adminRoleCheckMiddleware, controller.adminBlockUser);
    route.post("/block-employer/:id", authenticationMiddleware_1.default, adminRoleCheckMiddleware, controller.adminBlockEmployer);
    route.post("/Employer-verification/:id", authenticationMiddleware_1.default, adminRoleCheckMiddleware, controller.verifyEmployer);
    route.get("/get-all-unverified-Employers", authenticationMiddleware_1.default, adminRoleCheckMiddleware, controller.getUnverifiedEmployers);
    return route;
};
exports.default = adminRouter;
