import { HttpStatus } from "../../../types/httpStatus";
import { AdminInterface } from "../../../types/admin"; 
import AppError from "../../../utils/appError";
import { AuthServiceInterface } from "../../services/authServiceInterface";
import { AdminDbInterface,adminDbRepository  } from "../adminDbRepository";
import { ObjectId, Types } from "mongoose";


export const adminLoginUseCase = async (
    email: string,
    password: string,
    adminRepository: ReturnType<AdminDbInterface>,
    authService: ReturnType<AuthServiceInterface>
  ) => {
    const admin: AdminInterface | null = await adminRepository.getAdminByEmail(
      email
    );
    if (!admin) {
      throw new AppError("There is no admin in this email", HttpStatus.NOT_FOUND);
    }
    const isPasswordCorrect = await authService.comparePassword(
      password,
      admin?.password ?? ""
    );
    console.log(isPasswordCorrect,"passwordiscorrect");
    
    if (!isPasswordCorrect) {
      throw new AppError(
        "sorry , your password was incorrect.Please double-check your password",
        HttpStatus.UNAUTHORIZED
      );
    }
   const payload = admin._id ? admin._id.toString() : '';
  
    const token = authService.generateToken(payload,'admin');
    return token;
  };

  export const adminGetAllUsersUseCase = async (
    adminRepository: ReturnType<AdminDbInterface>
  ) => {
    const userData = await adminRepository.getAllUsers();
    if (!userData) {
      throw new AppError("No users found", HttpStatus.NOT_FOUND);
    }
    return userData;
  };

  export const adminGetAllEmployerUseCase = async (
    adminDbRepository: ReturnType<AdminDbInterface>
  ) => {
    const EmployerData = await adminDbRepository.getAllEmployers();
    if (!EmployerData) {
      throw new AppError("No agents found", HttpStatus.NOT_FOUND);
    }
    return EmployerData;
  };

  export const adminBlockUserUseCase = async (
    adminDbRepository: ReturnType<AdminDbInterface>,
    ojbId: string
  ) => {
    const adminBlockUser = await adminDbRepository.blockUser(ojbId);
    if (!adminBlockUser) {
      throw new AppError("Operation failed", HttpStatus.NOT_MODIFIED);
    }
    return adminBlockUser;
  };
  export const adminBlockEmployerUseCase = async (
    adminDbRepository: ReturnType<AdminDbInterface>,
    ojbId: string
  ) => {
    const adminBlockEmployer = await adminDbRepository.blockEmployer(ojbId);
    if (!adminBlockEmployer) {
      throw new AppError("Operation failed", HttpStatus.NOT_MODIFIED);
    }
    return adminBlockEmployer;
  };

  export const adminVerifyEmployerUseCase = async (
    adminDbRepository: ReturnType<AdminDbInterface>,
    objId: string
  ) => {
    const adminVerifyEmployer = await adminDbRepository.verifyEmployer(objId);
    if (!adminVerifyEmployer) {
      throw new AppError("Operation failed", HttpStatus.NOT_MODIFIED);
    }
    return adminVerifyEmployer;
  };

  export const adminGetUnverifiedEmployersUseCase = async (
    adminDbRepository: ReturnType<AdminDbInterface>
  ) => {
    const getAllUnverifiedEmployers = await adminDbRepository.getUnverifiedEmployers();
    if (!getAllUnverifiedEmployers) {
      throw new AppError("Operation failed", HttpStatus.NOT_FOUND);
    }
  
    return getAllUnverifiedEmployers
  };