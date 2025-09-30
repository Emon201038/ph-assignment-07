import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs"
import { IUser, UserRole } from "./user.interface";

const userSchema = new Schema<IUser>({
    name:{
        type: String,
        trim:true,
        required: [true,"Name is required"],
        min: [2,"Name should minimum 2 charecters"]
    },
    email:{
        type: String,
        unique:true,
        trim:true,
        required: [true,"email is required"],
        min: [2,"email should minimum 2 charecters"]
    },
    password:{
        type: String,
        trim:true,
        required: [true,"password is required"],
        min: [6,"password should minimum 6 charecters"],
        set: function(v:string){
            return bcrypt.hashSync(v,12)
        }
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER
    }
},{
    timestamps:true
});

const User = model<IUser>("User",userSchema);

export default User