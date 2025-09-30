import dotenv from "dotenv"
dotenv.config()
interface IEnvVars {
    PORT: string;
    DB_URL: string;
    SUPER_ADMIN_NAME:string;
    SUPER_ADMIN_EMAIL: string,
    SUPER_ADMIN_PASSWORD: string
};

const loadEnv = ():IEnvVars =>{
    const requiredEnv = [
        "PORT",
        "DB_URL",
        "SUPER_ADMIN_NAME",
        "SUPER_ADMIN_EMAIL",
        "SUPER_ADMIN_PASSWORD"
    ];

    requiredEnv.forEach((envVar) => {
        if (!process.env[envVar]) {
        throw new Error(`Missing environment variable: ${envVar}`);
        };
    });

    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL as string,
        SUPER_ADMIN_NAME: process.env.SUPER_ADMIN_NAME as string,
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
        SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,

    }
};

export const envVars = loadEnv()