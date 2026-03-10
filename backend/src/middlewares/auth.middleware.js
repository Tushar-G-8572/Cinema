import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'

async function authUser(req,res,next) {
    const token = req.cookies.token;
    try{
        if(!token) return res.status(400).json({message:"Token needed"});
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

        const user = await userModel.findById(decoded.id);

        if(!user) return res.status(404).json({message:"Invalid token"});

        req.user = {role:user.role,id:user._id};
        next();

    }catch(err){
        console.log(err);

    }

}

export default authUser;