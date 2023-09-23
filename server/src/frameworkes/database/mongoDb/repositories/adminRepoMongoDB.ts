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
  
    return{
        getAdminByEmail,
   
    }
}
export type AdminRepossitoryMongoDB = typeof adminRepositoryMongoDB;
