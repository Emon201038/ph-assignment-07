import { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    role: UserRole,
    email: string;
    password: string;
}

export enum UserRole {
    USER="USER",
    ADMIN="ADMIN",
    SUPER_ADMIN="SUPER_ADMIN"
}