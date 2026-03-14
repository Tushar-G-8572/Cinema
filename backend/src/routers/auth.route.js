import { Router } from "express";
import { loginController, logoutController, registerController } from "../controllers/auth.controller.js";
import { loginValidation,registerValidator,validate } from "../validation/auth.validate.js";
const authRouter = Router();

authRouter.post('/register',
    registerValidator,
    validate,
    registerController);

authRouter.post('/login',
    loginValidation,
    validate,
    loginController);
    
authRouter.post('/logout',logoutController);

export default authRouter