import { Request, Response } from 'express';
import { UserService } from '../services/user';
import { Inject, Service } from 'typedi';
import { matchedData, validationResult } from 'express-validator';

@Service()
export class UserController { 
    constructor(@Inject() public readonly userService: UserService) {}

    async createUser(req: Request, res: Response): Promise<Response> {
        const inputs = req.body;
        const user = await this.userService.createUser(inputs);
        return res.json(user);
    }

    async getUserDetails(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        const { id } = matchedData(req);
        const user = await this.userService.getUserById(id);
        return res.json(user);
    }

    async updateUserDetails(req: Request, res: Response): Promise<Response> {
        
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        const id = req.params.id;
        const inputs = matchedData(req);
        const updatedUser = await this.userService.updateUserById(parseInt(id), inputs);
        return res.json(updatedUser);
    }

    async deleteUser(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        const { id } = matchedData(req);
        await this.userService.deleteUserById(id);
        return res.sendStatus(204);
    }
}