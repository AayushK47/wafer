import { Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import { AuthService } from '../services';
import { matchedData, validationResult } from 'express-validator';

@Service()
export class AuthController { 
    constructor(@Inject() public readonly authService: AuthService) {}

    async register(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        const validatedInputs = matchedData(req);
        const registrationResponse = await this.authService.register(validatedInputs);
        return res.json(registrationResponse);
    }

    async login(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        const validatedInputs = matchedData(req);
        const loginResponse = this.authService.login(validatedInputs);
        
        return res.json(loginResponse)
        
    }

    async verifyOtp(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        const { email, otp } = matchedData(req);
        await this.authService.verifyOtp(email, otp);
        return res.status(200).send({
            message: "User verified"
        });
    }
}