import express from "express";
import { authService } from "../../services/authService";
import { authServiceInterface } from "../../../app/services/authServiceInterface";
import { adminDbRepository } from "../../../app/repositories/adminDbRepository";
import { adminRepositoryMongoDB } from "../../database/mongoDb/repositories/adminRepoMongoDB";
import adminController from "../../../adapters/controllers/adminControllers";
import authenticationMiddleware from "../middleware/authenticationMiddleware";
import roleMiddleware from "../middleware/roleMiddleware";
const adminRoleCheckMiddleware = roleMiddleware('admin');

const adminRouter =()=>{
    const route = express.Router();
    const controller = adminController(
      authServiceInterface,
      authService,
      adminDbRepository,
      adminRepositoryMongoDB
    );
  
    route.post("/login", controller.adminLogin);
    route.get( "/get-all-users",authenticationMiddleware,adminRoleCheckMiddleware,controller.adminGetAllUsers);
    route.get("/get-all-employers",authenticationMiddleware,adminRoleCheckMiddleware,controller.adminGetAllEmployers);
 
    return route;
}

export default adminRouter;