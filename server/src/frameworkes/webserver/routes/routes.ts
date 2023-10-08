import userAuthRouter from "./userAuth";
import employerAuthRouter from "./employerAuth";
import { Application } from "express";
import userRouter from "./user";
import authenticationMiddleware from "../middleware/authenticationMiddleware";
import employerRouter from "./employer";
import jobRouter from "./jobs";
import jobApplicationRouter from "./jobApplication";
import adminRouter from "./admin";
import conversationRouter from "./conversation";
import messageRouter  from "./message";


const routes = (app: Application) => {
    app.use('/api/admin',adminRouter())
    app.use('/api/user', userRouter());
    app.use('/api/user-auth', userAuthRouter());
    app.use('/api/employer-auth', employerAuthRouter());
    app.use('/api/employer',employerRouter());
    app.use('/api/job', authenticationMiddleware, jobRouter());
    app.use('/api/job-application',authenticationMiddleware, jobApplicationRouter());
    app.use('/api/messenger-conversation', conversationRouter());
    app.use('/api/messenger-message', authenticationMiddleware, messageRouter());
}

export default routes;