import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { AuthService } from "../../frameworkes/services/authService";
import { AuthServiceInterface } from "../../app/services/authServiceInterface";
import { EmployerDbInterface } from "../../app/repositories/employerDbRepository";
import { EmployerRepositoryMongoDB } from "../../frameworkes/database/mongoDb/repositories/employerRepositoryMongoDB";
import { registerEmployer,employerLogin } from "../../app/repositories/useCases/auth/employerAuth";
 

import { EmployerInterface } from "../../types/employerInterface";
import { EmployerModel } from "../../frameworkes/database/models/employerModel";
import { employerEmailVerification,  verifyEmailOTP } from "../../app/repositories/useCases/auth/employerAuth";
  
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
      console.log(req.body,"yes got it");
      const employer: EmployerInterface = req.body;
      console.log(req.file,"yesssss");
      if (req.file) {
        employer.idProof_img = req.file.path;
      }
       await registerEmployer(employer,dbRepositoryEmployer, authService);
      res.json({
        status: "success",
        message: "employer registered successfully",
      });
    }
  );

  const loginEmployer = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { email, password }: { email: string; password: string } = req.body;
      const token = await employerLogin(
        email,
        password,
        dbRepositoryEmployer,
        authService
      );
      res.json({
        status: "success",
        message: "employer verified",
        token,
      });
    }
  );

  const emailVerification = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const email = req.params.emailId;
      await employerEmailVerification(
        email,
        dbRepositoryEmployer,
        sendEmailService
      );
      res.json({ status: "success" });
    }
  );
  const OTPVerification = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const OTP = req.params.OTP;
      const response = await verifyEmailOTP(OTP, sendEmailService);
      if (response) {
        res.json({status: 'success', message: 'email verified'});
      }
    }
  );


  return {
    loginEmployer,
    employerRegister,
    emailVerification,
    OTPVerification
  };
};

export default employerAuthController;