const { check, validationResult } = require('express-validator');

exports.validateRegister = [
    check('name').isString().notEmpty().withMessage('Name is required'),
    check('email').notEmpty().isEmail().withMessage('Email is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];

exports.validateLogin = [
    check('email').isEmail().notEmpty().withMessage('Email is required'),
    check('password').notEmpty().withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];
