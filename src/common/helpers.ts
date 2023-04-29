import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export class Helper {
    static async hashPassword(text: string): Promise<string> {
        return await hash(text, 12);
    }

    static async compareHash(text: string, hash: string): Promise<boolean> {
        return await compare(text, hash)
    }

    static signJwt(payload: Record<string, any>): string {
        return sign(payload, 'superSecret', {
            expiresIn: '1d'
        })
    }

    static generateOtp(length: number) {
        return Math.floor(Math.random() * Math.pow(10, length));
    }
}