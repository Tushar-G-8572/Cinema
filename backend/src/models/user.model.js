import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    role:{
        type:String,
        enum:{
            values:["user","admin"]
        },
        default:"user"
    }
})

userSchema.pre("save",async function(){
    if(!this.isModified('password')){
        return;
    }
    const hash = await bcrypt.hash(this.password,10);
    this.password = hash;
})

userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password,this.password);
}


const userModel = mongoose.model("user",userSchema);

export default userModel;