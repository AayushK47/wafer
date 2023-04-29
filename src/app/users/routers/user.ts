import { Router } from "express";
import { UserController } from "../controllers/user";
import Container from "typedi";
import { updateUserValidator, userIdValidator, userParamMatching } from "../../../common/validators";
import { authorizationMiddleware } from "../../../common/middlewares/auth";

const userRouter = Router();
const userController = Container.get(UserController)

userRouter.get('/:id', authorizationMiddleware, ...userIdValidator(), userController.getUserDetails.bind(userController));
userRouter.patch('/:id', authorizationMiddleware, ...updateUserValidator(), userController.updateUserDetails.bind(userController));
userRouter.delete('/:id', authorizationMiddleware, ...userIdValidator(), ...userParamMatching(), userController.deleteUser.bind(userController));

export default userRouter;