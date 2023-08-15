import express from "express";
import authController from "../../../adapters/controllers/userAuthControllers";
import { userDbRepository } from "../../../app/repositories/userDbRepository";
import { UserRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepositoryMogoDb";
import { authService } from "../../services/authService";
import { authServiceInterface } from "../../../app/services/authServiceInterface";
import { User } from "../../database/models/userModel";
import {googleAuthService } from "../../services/googleAuthService";
import { googleAuthServiceInterface } from "../../../app/services/googleAuthServiceInterface";

const userAuthRouter = () => {
  const route = express.Router();
  console.log(userAuthRouter,"userAuthRouter");

  const controller = authController(
    authServiceInterface,
    authService,
    userDbRepository,
    UserRepositoryMongoDB,
    User,
    googleAuthServiceInterface,
    googleAuthService,
  );
  console.log(controller,"controller");
  
  route.post("/register", controller.userRegister);
  route.post("/login", controller.loginUser);
  route.post("/sign-in-with-google", controller.signWithGoogle);

  return route;
};

export default userAuthRouter;