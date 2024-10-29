import { UserModel } from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerUserValidator } from "../validators/user.js";
import { mailTransporter } from "../utils/mail.js";


// Register Users
export const registerUser = async (req, res, next) => {
    try {
        // validate user input
        const {error, value} = registerUserValidator.validate(req.body);

        if (error) {
            return res.status(422).json(error);
        }
        // check by email if user already exit 
        const user = UserModel.findOne({email: value.email});

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
        
    } catch (error) {
        next(error);
    }
}
// Login Users
// Get User Profile
// Update User Profile
// Logout Users
// Delete Users