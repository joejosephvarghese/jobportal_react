import userAuthRouter from "./userAuth";
import employerAuthRouter from "./employerAuth";
import { Application } from "express";
import userRouter from "./user";



const routes = (app: Application) => {
    app.use('/api/user', userRouter());
 
    app.use('/api/user-auth', userAuthRouter());
    app.use('/api/employer-auth', employerAuthRouter());

console.log(routes,"got routes");
}

export default routes;