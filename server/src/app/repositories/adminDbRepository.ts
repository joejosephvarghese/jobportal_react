import { ObjectId } from "mongoose";
import { AdminRepossitoryMongoDB } from "../../frameworkes/database/mongoDb/repositories/adminRepoMongoDB";
export const adminDbRepository = (
    repository: ReturnType<AdminRepossitoryMongoDB>
  ) => {
    const getAdminByEmail = async (email: string) =>await repository.getAdminByEmail(email);
    const getAllUsers = async () => await repository.getAllusers();
    const getAllEmployers = async () => await repository.getAllEmployers();
    return {
        getAdminByEmail,
        getAllUsers,
        getAllEmployers,
    }
  }
  export type AdminDbInterface = typeof adminDbRepository;



  