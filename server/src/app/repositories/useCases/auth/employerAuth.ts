import { HttpStatus } from "../../../../types/httpStatus";
import { CreateEmployerInterface } from "../../../../types/employerInterface";
import AppError from "../../../../utils/appError";
import { EmployerDbInterface } from "../../employerDbRepository";
import { AuthServiceInterface } from "../../../services/authServiceInterface";
import { EmailServiceInterface } from "../../../services/emailServiceInterface";

export const registerEmployer = async (
  employer: CreateEmployerInterface,
  employerRepository: ReturnType<EmployerDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  employer.email = employer?.email?.toLowerCase();
  const isExistingEmail = await employerRepository.getEmployerByEmail(
    employer.email ?? ''
  );
  if (isExistingEmail) {
    throw new AppError("email already exists", HttpStatus.CONFLICT);
  }
  employer.password = await authService.encryptPassword(employer.password ?? '');
  const result = await employerRepository.createEmployer(employer);
  return result;
};

