const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const { successResponse, errorResponse } = require('../helpers/responseHelper');
const { generateToken } = require('../lib/jwt');

const User = db.User;

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return errorResponse(res, 'User already exists with this email', {}, 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        const token = generateToken({ id: user.id });

        return successResponse(res, 'User registered successfully', { user, token });
    } catch (error) {
        return errorResponse(res, 'Registration failed', error);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return errorResponse(res, 'Invalid email or password', {}, 401);
        }
        
        const token = generateToken({ id: user.id });
        return successResponse(res, 'Login successful', { user, token });
    } catch (error) {
        return errorResponse(res, 'Login failed', error);
    }
};
