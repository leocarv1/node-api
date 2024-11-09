import { StatusCodes } from "http-status-codes";
import { Authentication } from "../services/Authentication";

export const ensureAuth = (req: any, res: any, next: any) => {
    const { authorization } = req.headers;
    
    if (!authorization) return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });
        
    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer') return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });

    const jwtData = Authentication.verifyToken(token);

    console.log(jwtData)

    if (jwtData === 'JWT_SECRET_NOT_FOUND') {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Invalid secret key" });
    } else if (jwtData === 'INVALID_TOKEN' || !jwtData || !jwtData.uid) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });
    }

    console.log(jwtData);

    req.headers.idUsuario = jwtData.uid.toString();

    return next(); 
}