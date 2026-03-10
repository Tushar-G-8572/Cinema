import userModel from "../models/user.model.js";
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken'


export async function registerController(req, res, next) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const isEmail = await userModel.findOne({
            $or: [{ username }, { email }]
        });
        if (isEmail) return res.status(409).json({ message: (isEmail.email == email) ? "Email already Exists" : "Username already exists" })

        const user = await userModel.create({ username, email, password });

        const token = jwt.sign({
            id: user._id,
            email: user.email
        },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "2d" }
        );

        res.cookie("token", token);

        res.status(201).json({
            message: "User registered Successfully", user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        err.status = 400;
        next(err);
    }
}

export async function loginController(req, res, next) {
    const { username, email, password } = req.body;
    try {

        if (!password) return res.status(400).json({ message: "password required for login" });
        const user = await userModel.findOne({
            $or: [
                { username }, { email }
            ]
        }).select("+password");

        if (!user) return res.status(404).json({ message: "Invalid credentials" });

        const isPassword = await user.comparePassword(password);

        if (!isPassword) return res.status(404).json({ message: "Invalid credentials" });

        const token = jwt.sign({
            id: user._id,
            email: user.email
        },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "2d" }
        );

        res.cookie('token', token);

        return res.status(200).json({
            message: "User logged IN",
            user: {
                id: user._id,
                email: user.email
            }
        })


    } catch (err) {
        err.status = 400;
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