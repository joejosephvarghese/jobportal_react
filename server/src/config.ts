import dotenv from 'dotenv'
dotenv.config();

const configKeys = {
  MONGO_DB_URL:"mongodb+srv://joejosephvarghese94:mg7tJ54WjsNPK22F@cluster0.rcescxu.mongodb.net/"
  ,
  DB_NAME: process.env.DB_NAME as string,
  JWT_KEY: "mysecretkey" ,
  GOOGLE_CLIENT_ID:"498270088613-9o90inr8sphe1t6l0j1m7929s3o8aki2.apps.googleusercontent.com",
  CLOUD_NAME: process.env.CLOUD_NAME as string,
  API_KEY: process.env.API_KEY as string,
  APP_SECRET: process.env.APP_SECRET as string,
  PORT: process.env.PORT as string,
  ORIGIN_PORT: process.env.ORIGIN_PORT as string,
  NODE_MAIL_USER: process.env.NODE_MAIL_USER_EMAIL as string,
  NODE_MAIL_PASS: process.env.EMAIL_PASS as string,
};
export default configKeys;