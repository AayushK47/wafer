import { Service } from "typedi";
import { UserModel } from "../model";
import { Helper } from "../../../common";
import { getCacheClient } from "../../../core/cache/redis";
import { sendEmail } from "../../queue-worker/mailer";
import { sendSms } from "../../queue-worker/sms";
import { User } from '../../../common/interfaces/user';

@Service()
export class AuthService {
    async register(inputs: Record<string, any>): Promise<User> {
        const { password } = inputs;

        const hashedPassword = await Helper.hashPassword(password);

        const newUser = await UserModel.query().insert({ ...inputs, password: hashedPassword }).returning('*');

        const otp = Helper.generateOtp(6)
        const cacheClient = await getCacheClient()
        cacheClient.set(newUser?.email ?? "", otp);
        cacheClient.expire(newUser?.email ?? "", 60 * 10);
        sendEmail({ from: "aayushkurup786@gmail.com", to: newUser.email ?? "", subject: "User Verification", text: `Your OTP is ${otp}. It will be active for 10 minutes` })
        sendSms({ mobileNumber: newUser?.mobileNumber ?? '', message: `Your OTP is ${otp}. It will be active for 10 minutes` })
        return { ...newUser };
    }

    async login(inputs: Record<string, any>): Promise<User | { message: string }> {
        const { email, password } = inputs;
        const user = await UserModel.query().findOne({ email });
        
        const isPasswordMatching = await Helper.compareHash(password, user ? user.password ?? '' : '');
        
        if(!isPasswordMatching) {
            throw Error('Passwords do not match');
        }
        
        if(!user?.verified) {
            return { message: "User is unverified" };
        }

        const token = Helper.signJwt({ sub: user.id });

        return { token };
    }

    async verifyOtp(email: string, otp: string): Promise<void> {
        const cacheClient = await getCacheClient();
        const storedOtp = await cacheClient.get(email);

        if(!storedOtp) {
           throw new Error(`No OTP requested with email ${email}`);
        }


        if(parseInt(otp) !== parseInt(storedOtp)) {
            throw new Error('Invalid OTP');
        }

        await UserModel.query().findOne({ email }).patch({ verified: true });
        await cacheClient.del(email);
    }
}