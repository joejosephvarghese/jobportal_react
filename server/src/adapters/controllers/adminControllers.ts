import { AuthServiceInterface } from "../../app/services/authServiceInterface";
import { AdminInterface } from "../../types/admin";
import { Request,Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { CustomRequest } from "../../types/expressRequest";
import { AuthService } from "../../frameworkes/services/authService";
import { AdminDbInterface } from "../../app/repositories/adminDbRepository";
import { AdminRepossitoryMongoDB } from "../../frameworkes/database/mongoDb/repositories/adminRepoMongoDB";
import { adminLoginUseCase,adminGetAllUsersUseCase,adminGetAllEmployerUseCase,adminBlockUserUseCase, adminBlockEmployerUseCase } from "../../app/repositories/useCases/adminAuth";

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

    const adminGetAllUsers = expressAsyncHandler(async (req: Request,res: Response)=>{
        const userData = await adminGetAllUsersUseCase(dbRepositoryAdmin)
        res.json({
            status: 'success',
            userData
        })
    })

    const adminGetAllEmployers = expressAsyncHandler(async (req: Request,res:Response)=>{
        const EmployerData = await adminGetAllEmployerUseCase(dbRepositoryAdmin)
        res.json({
            status: 'success',
            EmployerData
        })
    })
    const adminBlockUser = expressAsyncHandler(async(req: Request,res: Response)=>{
        const userId = req.params.id
        console.log(userId,"getuserid");
        const result = await adminBlockUserUseCase(dbRepositoryAdmin, userId)
        res.json({
            status: 'success',
            result
        })
    })
    const adminBlockEmployer = expressAsyncHandler(async (req: Request, res: Response)=>{
        const EmployerId = req.params.id
        const result = await adminBlockEmployerUseCase(dbRepositoryAdmin,EmployerId)
        console.log(result,"current result");
        
        res.json({
            status: 'success',
            result
        })
    }) 
  
   
    return{
   adminLogin,
   adminGetAllUsers,
   adminGetAllEmployers,
   adminBlockUser,
   adminBlockEmployer,
    }
}
export default adminController