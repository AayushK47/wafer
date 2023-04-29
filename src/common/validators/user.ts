import { body, param } from 'express-validator';
import { UserModel } from '../../app/users/model';

export function updateUserValidator() {
    return [
        body('firstName').optional().notEmpty(),
        body('lastName').optional().notEmpty(),
        body('email').optional().notEmpty().isEmail(),
        body('mobileNumber').optional().notEmpty().isString().isLength({ max: 10, min: 10 }).escape(),
        ...userIdValidator(),
        ...userParamMatching()
    ];
}

export function userIdValidator() {
    return [
        param('id').toInt().custom(async (value) => {
            const exists = await UserModel.query().findById(value);

            if(!exists) {
                throw new Error("Id does not exist");
            }
        })
    ];
}

export function userParamMatching() {
    return [
        param('id').custom((value, { req }) => {
            if(value !== req.userId) {
                console.log('here')
                throw Error("Not allowed");
            }
            return true;
        })
    ]
}