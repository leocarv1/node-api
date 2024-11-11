import { StatusCodes } from "http-status-codes";
import { Authentication } from "../services/Authentication";

export const ensureAuth = (req: any, res: any, next: any) => {
    const { authorization } = req.headers;
    console.log(authorization);
    
    if (!authorization) return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized | no token" });
        
    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer') return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized type" });

    const jwtData = Authentication.verifyToken(token);

    console.log(jwtData)

    if (jwtData === 'JWT_SECRET_NOT_FOUND') {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Invalid secret key" });
    } else if (jwtData === 'INVALID_TOKEN' || !jwtData || !jwtData.uid) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized | invalid token" });
    }

    console.log(jwtData);

    req.headers.idUsuario = jwtData.uid.toString();

    return next(); 
}