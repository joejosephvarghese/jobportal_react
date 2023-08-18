import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { AuthService } from "../../frameworkes/services/authService";
import { AuthServiceInterface } from "../../app/services/authServiceInterface";
import { EmployerDbInterface } from "../../app/repositories/employerDbRepository";
import { EmployerRepositoryMongoDB } from "../../frameworkes/database/mongoDb/repositories/employerRepositoryMongoDB";
import { registerEmployer } from "../../app/repositories/useCases/auth/employerAuth";
 

import { EmployerInterface } from "../../types/employerInterface";
import { EmployerModel } from "../../frameworkes/database/models/employerModel";
// import { employerEmailVerification,verifyEmailOTP } from "../../app/repositories/useCases/auth/employerAuth";
  
import { EmailServiceInterface } from "../../app/services/emailServiceInterface";
import { SendEmailService,sendEmailService } from "../../frameworkes/services/emailServce";


const employerAuthController = (
  authServiceInterface: AuthServiceInterface,
  authServiceImpl: AuthService,
  employerDbRepository: EmployerDbInterface,
  employerDbRepositoryImpl: EmployerRepositoryMongoDB,
  employer: EmployerModel,
  emailService: EmailServiceInterface,
  emailServiceImpl: SendEmailService
) => {
  const dbRepositoryEmployer = employerDbRepository(
    employerDbRepositoryImpl(employer)
  );
  const authService = authServiceInterface(authServiceImpl());
  const sendEmailService = emailService(emailServiceImpl());

  const employerRegister = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const employer: EmployerInterface = req.body;
      await registerEmployer(employer, dbRepositoryEmployer, authService);
      res.json({
        status: "success",
        message: "employer registered successfully",
      });
    }
  );



  return {
  
    employerRegister,
    
  };
};

export default employerAuthController;