import { Service } from "typedi";

import { UserModel } from "../model";
import { User } from '../../../common/interfaces/user';

@Service()
export class UserService {
    async createUser(input: Record<string, any>): Promise<User> {
        const user = await UserModel.query().insert(input).returning("*");
        return user;
    }

    async getUserById(id: number): Promise<User> {
        
        const user = await UserModel.query().findById(id);
        return user as User;
    }

    async updateUserById(id: number, inputs: Record<string, any>): Promise<User> {
        const updatedUser = UserModel.query().where('id', id).patch(inputs).returning('*').first();
        return updatedUser as User;
    }

    async deleteUserById(id: number): Promise<void> {
        await UserModel.query().deleteById(id);
    }
}