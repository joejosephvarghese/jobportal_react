import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { AuthService } from "../../frameworkes/services/authService";
import { AuthServiceInterface } from "../../app/services/authServiceInterface";
import { UserDbInterface } from "../../app/repositories/userDbRepository";
import { UserRepositoryMongoDB } from "../../frameworkes/database/mongoDb/repositories/userRepositoryMogoDb";
import { userLogin, registerUser, signInWithGoogle } from "../../app/repositories/useCases/auth/userAuth"
import { CreateUserInterface, UserInterface } from "../../types/userInterface";
import { UserModel } from "../../frameworkes/database/models/userModel";
import { GoogleAuthService } from "../../frameworkes/services/googleAuthService";
import { GoogleAuthServiceInterface } from "../../app/services/googleAuthServiceInterface";

const authController = (
  authServiceInterface: AuthServiceInterface,
  authServiceImpl: AuthService,
  userDbRepository: UserDbInterface,
  userDbRepositoryImpl: UserRepositoryMongoDB,
  userModel: UserModel,
  googleAuthServiceInterface: GoogleAuthServiceInterface,
  googleAuthServiceImpl: GoogleAuthService
) => {
  const dbRepositoryUser = userDbRepository(userDbRepositoryImpl(userModel));
  console.log(dbRepositoryUser,"oppppppppppppppppppppp");
  console.log(userDbRepositoryImpl,"user db imp");
  const authService = authServiceInterface(authServiceImpl());
  const googleAuthService = googleAuthServiceInterface(googleAuthServiceImpl());



  const userRegister = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const user: CreateUserInterface = req?.body;
      
     console.log(user,"got userdata");

      await registerUser(user, dbRepositoryUser, authService);
     
      res.json({
        status: "success",
        message: "user registered successfully",
      });
    }
  );

  const loginUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    console.log(email,password);
    const token = await userLogin(
      email,
      password,
      dbRepositoryUser,
      authService
    );
    console.log(token,"got token");
    res.json({
      status: "success",
      message: "user verified",
      token,
    });
  });

  const signWithGoogle = expressAsyncHandler(async (req: Request, res: Response) => {
    const {credential} : {credential: string} = req.body;
    console.log(credential,"credential");
    const token = await signInWithGoogle(credential, googleAuthService, dbRepositoryUser, authService);
    res.json({
      status: "success",
      message: "user verified",
      token
    })
  }) 

  return {
    loginUser,
    userRegister,
    signWithGoogle
  };
};

export default authController;
