import express from "express";
import employerAuthController from "../../../adapters/controllers/employerAuthController";
import { employerDbRepository } from "../../../app/repositories/employerDbRepository";
import { EmployerRepositoryMongoDB } from "../../database/mongoDb/repositories/employerRepositoryMongoDB";
import { authService } from "../../services/authService";
import { authServiceInterface } from "../../../app/services/authServiceInterface";
import { Employer } from "../../database/models/employerModel";
import { emailServiceInterface } from "../../../app/services/emailServiceInterface";
import { sendEmailService } from "../../services/emailServce";

const employerAuthRouter = () => {
  const route = express.Router();

  const controller = employerAuthController(
    authServiceInterface,
    authService,
    employerDbRepository,
    EmployerRepositoryMongoDB,
    Employer,
    emailServiceInterface,
    sendEmailService
  );

  route.post("/register", controller.employerRegister);
 

  return route;
};

export default employerAuthRouter;