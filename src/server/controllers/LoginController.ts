import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../shared/middlewares';
import { City, User } from '../models';

// Interfaces
import { IUser } from '../interfaces/IUser';
import { IFilter } from '../interfaces/IFilter';
import { Op } from 'sequelize';
import { UserService } from '../services/users/UserService';
import { Authentication } from '../shared/services/Authentication';

interface IParamsProps {
    id?: number;
}

interface IBodyProps extends Omit<IUser, 'id'> {}

interface IBodyPropsSingIn extends Omit<IUser, 'id' | 'fullName' | 'cityId'> {}

export class LoginController {
    
    static singUpValidation = validation((getSchema) => ({
        body: getSchema<IBodyProps>(yup.object().shape({
            fullName: yup.string().required().min(3),
            email: yup.string().required().min(3),
            cityId: yup.number().required().max(15),
            password: yup.string().required().min(3)
        }))
    }));

    static async singUp(req: Request<{}, {}, IBodyProps>, res: Response) {
        try {
            const user = await User.create(req.body, {
                include: [{
                    model: City,
                    as: 'city',
                    where: { id: req.body.cityId }
                }]
            });

            return res.status(StatusCodes.CREATED).json(user);
        } catch (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).json({msg: "SingUp failed!"});
        }
    };

    static singInValidation = validation((getSchema) => ({
        body: getSchema<IBodyPropsSingIn>(yup.object().shape({
            email: yup.string().required().min(3),
            password: yup.string().required().min(3)
        }))
    }));

    static async singIn(req: Request<{}, {}, IBodyPropsSingIn>, res: Response) {
        const {email, password} = req.body;

        try {
            const user = await UserService.getByEmail(email);

            if (!user) {
                return res.status(StatusCodes.BAD_REQUEST).json({msg: "User not found!"});
            } else if (!password) {
                return res.status(StatusCodes.BAD_REQUEST).json({msg: "Password missing!"});
            }

            const passwordVerified = await Authentication.verifyPassword(password, user.password);

            if (!passwordVerified) {
                return res.status(StatusCodes.BAD_REQUEST).json({msg: "Password invalid"});
            } 

            const token = Authentication.jwtToken(user.id);

            return res.status(StatusCodes.OK).json({ accessToken: token});
        } catch (err) {
            console.log(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Error to singIn" });
        }
    }
}

export default LoginController;