"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employerAuthController_1 = __importDefault(require("../../../adapters/controllers/employerAuthController"));
const employerDbRepository_1 = require("../../../app/repositories/employerDbRepository");
const employerRepositoryMongoDB_1 = require("../../database/mongoDb/repositories/employerRepositoryMongoDB");
const authService_1 = require("../../services/authService");
const authServiceInterface_1 = require("../../../app/services/authServiceInterface");
const employerModel_1 = require("../../database/models/employerModel");
const emailServiceInterface_1 = require("../../../app/services/emailServiceInterface");
const emailServce_1 = require("../../services/emailServce");
const multerCloudinary_1 = require("../middleware/multerCloudinary");
const employerAuthRouter = () => {
    const route = express_1.default.Router();
    const controller = (0, employerAuthController_1.default)(authServiceInterface_1.authServiceInterface, authService_1.authService, employerDbRepository_1.employerDbRepository, employerRepositoryMongoDB_1.EmployerRepositoryMongoDB, employerModel_1.Employer, emailServiceInterface_1.emailServiceInterface, emailServce_1.sendEmailService);
    route.post("/register", multerCloudinary_1.uploads, controller.employerRegister);
    route.post("/login", controller.loginEmployer);
    route.get("/email-verify/:emailId", controller.emailVerification);
    route.get("/email-OTP/:OTP", controller.OTPVerification);
    return route;
};
exports.default = employerAuthRouter;
