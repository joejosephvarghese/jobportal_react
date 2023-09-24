import { ObjectId } from "mongoose";
import { AdminRepossitoryMongoDB } from "../../frameworkes/database/mongoDb/repositories/adminRepoMongoDB";
export const adminDbRepository = (
    repository: ReturnType<AdminRepossitoryMongoDB>
  ) => {
    const getAdminByEmail = async (email: string) =>await repository.getAdminByEmail(email);
    const getAllUsers = async () => await repository.getAllusers();
    const getAllEmployers = async () => await repository.getAllEmployers();
    const blockUser = async (ojbId: string) => await repository.blockUser(ojbId);
    return {
        getAdminByEmail,
        getAllUsers,
        getAllEmployers,
        blockUser,
    }
  }
  export type AdminDbInterface = typeof adminDbRepository;



  