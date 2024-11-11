import { compare, genSalt, hash } from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import * as jwt from 'jsonwebtoken'

interface IJwtData {
    uid: number;
}

export class Authentication {

    private static passwordSalt = 12; 

    public static async hashPassword(password: string) {
        const saltGenerate = await genSalt(this.passwordSalt)

        const hashPass = await hash(password, saltGenerate);

        return hashPass;
    }

    public static async verifyPassword(password: string, hashPassword: string) {
        return await compare(password, hashPassword);
    }

    static verifyToken(token: string): IJwtData | 'JWT_SECRET_NOT_FOUND' | 'INVALID_TOKEN' {
        const secretKey = process.env.SECRET_JWT;
        if (!secretKey) return "JWT_SECRET_NOT_FOUND";

        try {
            const decode = jwt.verify(token, secretKey)

            return decode as IJwtData;
        } catch (err) {
            console.log(err);
            return 'INVALID_TOKEN';
        }
    }

    public static jwtToken(id: number) {
        const secretKey = process.env.SECRET_JWT;

        if (!secretKey) return console.log("Invalid secret Key");

        const token = jwt.sign({
            uid: id
        }, secretKey, { expiresIn: '24h' });

        return token;
    }
}