import { ObjectId } from "mongoose";
import { AdminRepossitoryMongoDB } from "../../frameworkes/database/mongoDb/repositories/adminRepoMongoDB";
export const adminDbRepository = (
    repository: ReturnType<AdminRepossitoryMongoDB>
  ) => {
    const getAdminByEmail = async (email: string) =>await repository.getAdminByEmail(email);
    const getAllUsers = async () => await repository.getAllusers();

    return {
        getAdminByEmail,
        getAllUsers,
    }
  }
  export type AdminDbInterface = typeof adminDbRepository;