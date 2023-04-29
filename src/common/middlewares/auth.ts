import { NextFunction, Request, Response } from "express";
import { JwtPayload, decode } from "jsonwebtoken";
import { UserModel } from "../../app/users/model";

export async function authorizationMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    let payload = decode(token as string);
    const { sub } = payload as JwtPayload;
    const user = await UserModel.query().findById(sub ?? "");
    if(!user) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    if(!user?.verified) {
        return res.status(401).json({
            message: "User not verified"
        });
    }

    req.userId = parseInt(sub ?? "");
    
    next();
}