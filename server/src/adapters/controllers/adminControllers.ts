import { AuthServiceInterface } from "../../app/services/authServiceInterface";
import { AdminInterface } from "../../types/admin";
import { Request,Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { CustomRequest } from "../../types/expressRequest";
import { AuthService } from "../../frameworkes/services/authService";
import { AdminDbInterface } from "../../app/repositories/adminDbRepository";
import { AdminRepossitoryMongoDB } from "../../frameworkes/database/mongoDb/repositories/adminRepoMongoDB";
import { adminLoginUseCase } from "../../app/repositories/useCases/adminAuth";

const adminController = (
    authServiceInterface: AuthServiceInterface,
    authService: AuthService,
    adminDbRepositoryInterface: AdminDbInterface,
    adminDbRepositoryMongoDb: AdminRepossitoryMongoDB
) => {
    const dbRepositoryAdmin = adminDbRepositoryInterface(adminDbRepositoryMongoDb())
    console.log(dbRepositoryAdmin,"dbRepositoryAdmin");
    
    const authServices = authServiceInterface(authService())
    const adminLogin = expressAsyncHandler(async (req: Request, res: Response)=>{
        console.log(req.body)
        const {email,password}:{email: string, password: string} = req.body;
        const token = await adminLoginUseCase(email,password,dbRepositoryAdmin,authServices)
        res.json({
            status: true,
            message:'admin login successful',
            token
        })
    })
   
    return{
   adminLogin,

    }
}
export default adminController