import { Router } from "express";
import Container from "typedi";
import { AuthController } from "../controllers";
import { loginValidator, registerValidator, verifyOtpValidator } from "../../../common/validators";

const authRouter = Router();
const authController = Container.get(AuthController)

authRouter.post('/register', ...registerValidator(), authController.register.bind(authController));
authRouter.post('/login', ...loginValidator(), authController.login.bind(authController));
authRouter.post('/verify', ...verifyOtpValidator(), authController.verifyOtp.bind(authController));

export default authRouter;