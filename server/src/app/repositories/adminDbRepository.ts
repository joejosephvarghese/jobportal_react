import { ObjectId } from "mongoose";
import { AdminRepossitoryMongoDB } from "../../frameworkes/database/mongoDb/repositories/adminRepoMongoDB";
export const adminDbRepository = (
    repository: ReturnType<AdminRepossitoryMongoDB>
  ) => {
    const getAdminByEmail = async (email: string) =>await repository.getAdminByEmail(email);

    return {
        getAdminByEmail,
     
    }
  }
  export type AdminDbInterface = typeof adminDbRepository;