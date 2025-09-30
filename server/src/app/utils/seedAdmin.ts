import { envVars } from "../config/env"
import { UserRole } from "../modules/user/user.interface";
import User from "../modules/user/user.model"
import ApiError from "./apiError";

export const seedAdmin = async () => {
    try {
        const isExists = await User.findOne({email: envVars.SUPER_ADMIN_EMAIL});
        if(isExists){
            console.log('Super admin is already exists');
        } else {
            await User.create({
                name: envVars.SUPER_ADMIN_NAME,
                email: envVars.SUPER_ADMIN_EMAIL,
                password: envVars.SUPER_ADMIN_PASSWORD,
                role: UserRole.SUPER_ADMIN
            });
            console.log('Super admin created successfully');
        }
    } catch (error) {
        throw new ApiError(500,(error as any)?.message)
    }
}