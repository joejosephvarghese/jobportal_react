import Admin from "../../models/adminModel";
import { User } from "../../models/userModel";
import { Employer } from "../../models/employerModel";
import { AdminInterface } from "../../../../types/admin";
import { log } from "console";
import { ObjectId,Types } from "mongoose";


export const adminRepositoryMongoDB = () => {
    
    const getAdminByEmail = async (email: string) => {
      return Admin.findOne({ email });
    };
    const getAllusers = async () => {
      const AllUsers = await User.find();
      return AllUsers;
    };
  
    return{
        getAdminByEmail,
        getAllusers,
    }
}
export type AdminRepossitoryMongoDB = typeof adminRepositoryMongoDB;
