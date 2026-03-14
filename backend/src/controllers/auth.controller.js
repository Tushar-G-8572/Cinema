import userModel from "../models/user.model.js";
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken'


export async function registerController(req, res, next) {

    try {

        const { username, email, password } = req.body;

        const isEmail = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (isEmail) {
            const error = new Error(
                isEmail.email === email
                    ? "Email already exists"
                    : "Username already exists"
            );
            error.status = 409;
            return next(error);
        }

        const user = await userModel.create({ username, email, password });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "2d" }
        );

        res.cookie("token", token);

        res.status(201).json({
            message: "User registered Successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        err.status = 500;
        next(err); // ✅ goes to error middleware
    }
}

export async function loginController(req, res, next) {

    try {

        const { username, email, password } = req.body;

        const user = await userModel.findOne({
            $or: [{ username }, { email }]
        }).select("+password");

        if (!user) {
            const err = new Error("Invalid Credentials");
            err.status = 401;
            return next(err);
        }

        const isPassword = await user.comparePassword(password);

        if (!isPassword) {
            const err = new Error("Invalid Credentials");
            err.status = 401;
            return next(err);
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "2d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict"
        });

        return res.status(200).json({
            success: true,
            message: "User Logged In",
            user: {
                id: user._id,
                email: user.email
            }
        });

    } catch (err) {
        err.status = 500;
        next(err);
    }
}

export async function logoutController(req, res, next) {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "user logged out" });
    } catch (err) {
        err.status = 400;
        next(err);
    }
}