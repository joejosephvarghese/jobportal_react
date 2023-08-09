import mongoose from "mongoose";
import configKeys from "../../config";

const mongodburl=configKeys.MONGO_DB_URL

const connectDB = async () => {
console.log(mongodburl);
    const dbObject = {
        dbName: "jobportal"
    }
    
    try {
      await mongoose.connect(mongodburl,dbObject)
      console.log(`Database connected successfully`)
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  }
  
  export default connectDB