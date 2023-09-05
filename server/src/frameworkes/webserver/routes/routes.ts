import userAuthRouter from "./userAuth";
import employerAuthRouter from "./employerAuth";
import { Application } from "express";
import userRouter from "./user";
import authenticationMiddleware from "../middleware/authenticationMiddleware";
import employerRouter from "./employer";
import jobRouter from "./jobs";

const routes = (app: Application) => {
    app.use('/api/user', userRouter());
 
    app.use('/api/user-auth', userAuthRouter());
    app.use('/api/employer-auth', employerAuthRouter());
    app.use('/api/employer',employerRouter());
    app.use('/api/job', authenticationMiddleware, jobRouter());

console.log(routes,"got routes");
}

export default routes;