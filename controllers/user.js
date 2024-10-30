import { UserModel } from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginUserValidator, registerUserValidator } from "../validators/user.js";
import { mailTransporter } from "../utils/mail.js";


// Register Users
export const registerUser = async (req, res, next) => {
    try {
        // validate user input
        const { error, value } = registerUserValidator.validate(req.body);

        if (error) {
            return res.status(422).json(error);
        }
        // check by email if user already exit 
        const user = await UserModel.findOne({ email: value.email });

        if (user) {
            return res.status(409).json('User already exist!');
        }
        // Hash user password
        const hashPassword = bcryptjs.hashSync(value.password, 10);
        // save user into database
        await UserModel.create({
            ...value,
            password: hashPassword
        });
        // send confirmation email
        await mailTransporter.sendMail({
            to: value.email,
            subject: "User Registeration",
            text: `Welcome! ${value.userName}, your account has been registered successfully.`
        });
        // Respond to request
        res.json('User Registered!')

    } catch (error) {
        next(error);
    }
}

// Login Users
export const userLogin = async (req, res, next) => {
    try {
        // validate user input
        const { error, value } = loginUserValidator.validate(req.body);

        if (error) {
            return res.status(422).json(error);
        }
        // find a registered user with identifier
        const user = await UserModel.findOne({ email: value.email });

        if (!user) {
            return res.status(404).json('User does not exist');
        }
        // compare credentials (user-email and password)
        const correctPassword = bcryptjs.compareSync(value.password, user.password);

        if (!correctPassword) {
            return res.status(401).json('Invalid credentials!');
        }
        // sign a token for user
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '24h' }
        );
        // Respond to request
        res.json({
            message: 'Login Successful',
            accessToken: token
        });
    } catch (error) {
        next(error);
    }
}
// Get User Profile
// Update User Profile
// Logout Users
// Delete Users