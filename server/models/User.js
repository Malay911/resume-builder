import mongoose from "mongoose";
import bcrypt from "bcrypt"

const UserSchema=new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: false, default: null},
    googleId: {type: String, default: null},
    githubId: {type: String, default: null},
    picture: {type: String, default: null},
},{timestamps: true})

UserSchema.methods.comparePassword=function(password){
    if(!this.password) return false;
    return bcrypt.compareSync(password, this.password)
}

const User=mongoose.model("User",UserSchema)

export default User;