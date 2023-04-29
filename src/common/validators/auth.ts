import { body } from 'express-validator';
import { UserModel } from '../../app/users/model';

export function registerValidator() {
    return [
        body('firstName').trim().notEmpty().trim(),
        body('lastName').trim().notEmpty().trim(),
        body('email').trim().notEmpty().isEmail().custom(async (value) => {
            const exists = await UserModel.query().findOne({"email": value});

            if(exists) {
                throw new Error("Email already exists");
            }
        }),
        body('mobileNumber').trim().notEmpty().isLength({ max: 10, min: 10 }).custom(async (value) => {
            const exists = await UserModel.query().findOne({"mobileNumber": value});

            if(exists) {
                throw new Error("Modile Number already exists");
            }
        }),
        body('password').trim().notEmpty().isLength({ min: 8, max: 32  })
    ];
}

export function loginValidator() {
    return [
        body('email').trim().notEmpty().isEmail().custom(async (value) => {
            const exists = await UserModel.query().findOne({"email": value});

            if(!exists) {
                throw new Error("Email does not exists");
            }
        }),
        body('password').trim().notEmpty()
    ];
}

export function verifyOtpValidator() {
    return [
        body('email').trim().notEmpty().isEmail().custom(async (value) => {
            const exists = await UserModel.query().findOne({"email": value});

            if(!exists) {
                throw new Error("Email does not exists");
            }

            if(exists.verified) {
                throw new Error("User is already verified");
            }
        }),
        body('otp').trim().isLength({ min: 6, max: 6 }).toInt()
    ];
}

