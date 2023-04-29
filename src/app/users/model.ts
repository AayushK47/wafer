import { Model } from "objection";
import { Service } from "typedi";

@Service()
export class UserModel extends Model {

  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobileNumber?: string;
  password?: string;
  verified?: boolean;

  static tableName = 'users';
}