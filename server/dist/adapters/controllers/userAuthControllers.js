"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userAuth_1 = require("../../app/repositories/useCases/auth/userAuth");
const authController = (authServiceInterface, authServiceImpl, userDbRepository, userDbRepositoryImpl, userModel, googleAuthServiceInterface, googleAuthServiceImpl) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl(userModel));
    console.log(dbRepositoryUser, "oppppppppppppppppppppp");
    console.log(userDbRepositoryImpl, "user db imp");
    const authService = authServiceInterface(authServiceImpl());
    const googleAuthService = googleAuthServiceInterface(googleAuthServiceImpl());
    const userRegister = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req === null || req === void 0 ? void 0 : req.body;
        console.log(user, "got userdata");
        yield (0, userAuth_1.registerUser)(user, dbRepositoryUser, authService);
        res.json({
            status: "success",
            message: "user registered successfully",
        });
    }));
    const loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        console.log(email, password);
        const token = yield (0, userAuth_1.userLogin)(email, password, dbRepositoryUser, authService);
        console.log(token, "got token");
        res.json({
            status: "success",
            message: "user verified",
            token,
        });
    }));
    const signWithGoogle = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { credential } = req.body;
        // console.log(credential,"credential");
        const token = yield (0, userAuth_1.signInWithGoogle)(credential, googleAuthService, dbRepositoryUser, authService);
        console.log('====================================');
        console.log(token);
        console.log('====================================');
        res.json({
            status: "success",
            message: "user verified",
            token
        });
    }));
    return {
        loginUser,
        userRegister,
        signWithGoogle
    };
};
exports.default = authController;
