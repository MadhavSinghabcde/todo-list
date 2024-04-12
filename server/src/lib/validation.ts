import { body } from 'express-validator';

const taskValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('completed').isBoolean().withMessage('Completed must be a boolean'),
]

const registerValidationRules = [
    body('username')
        .notEmpty().withMessage('Username is requried'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isStrongPassword().withMessage('Password not strong enough')
]

const loginValidationRules = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email'),
    body('password')
        .notEmpty().withMessage('Password is required')
]

export { taskValidationRules, registerValidationRules, loginValidationRules };
