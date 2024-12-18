import { BlacklistModel, UserModel } from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginUserValidator, registerUserValidator, updateUserValidator } from "../validators/user.js";
import { mailTransporter } from "../utils/mail.js";
import { generateEmailTemplate } from "../utils/template.js";
import { ProjectModel } from "../models/project.js";
import { TaskModel } from "../models/task.js";



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

        //pick username from value
///html content goes here
        const emailContent = `
         <p>Dear ${value.fullName},</p>
              <h4>Your have been registered successfully!</h4>
              <p>Login to enjoy your workspace on Freelix</p>
        `
        // send confirmation email
        await mailTransporter.sendMail({
            from: `FREELIX <freelix.inc@gmail.com>`,
            to: value.email,
            subject: "User Registeration",
            html: generateEmailTemplate(emailContent)
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
            { id: user.id, email: user.email },
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
export const getUserProfile = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.auth.id).select({ password: false });

        res.json(user);
    } catch (error) {
        next(error);
    }
}

// Get user projects
export const getUserProjects = async (req, res, next) => {
    try {
        
        const {filter = '{}', sort = '{}', limit = 10, skip = 0} = req.query

        const project = await ProjectModel
        .find({
            ...JSON.parse(filter),
            user: req.auth.id
        })
        .sort(JSON.parse(sort))
        .limit(limit)
        .skip(skip);

        res.json(project);
    } catch (error) {
        next(error);
    }
}

export const getUserTasks = async (req, res, next) => {
    try {
        
        const {filter = '{}', sort = '{}', limit = 10, skip = 0} = req.query

        const task = await TaskModel
        .find({
            ...JSON.parse(filter),
            user: req.auth.id
        })
        .sort(JSON.parse(sort))
        .limit(limit)
        .skip(skip);

        res.json(task);
    } catch (error) {
        next(error);
    }
}

// Update User Profile
export const updateUserProfile = async (req, res, next) => {
    try {
        // validate user input
        const { error, value } = updateUserValidator.validate({
            ...req.body,
            avatar: req.file?.filename
        });
        if (error) {
            return res.status(422).json(error);
        }

        // Update user
        await UserModel.findByIdAndUpdate(req.auth.id, value);
        // Respond to request
        res.json('User profile updated')
    } catch (error) {
        next(error);
    }
}
// Logout Users
export const userLogout = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided.' })
        }
        // Decode the token to get the expiration date
        const decoded = jwt.decode(token);
        const expiresAt = new Date(decoded.exp * 1000); //Convert to milliseconds

        // Store the token in the blacklist
        await BlacklistModel.create({ token, expiresAt });


        res.json({ message: 'Successfully logged out!' })
    } catch (error) {
        next(error);
    }
}

// Delete Users