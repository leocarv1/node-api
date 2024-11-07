import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../shared/middlewares';
import { City, User } from '../models';

// Interfaces
import { IUser } from '../interfaces/IUser';
import { IFilter } from '../interfaces/IFilter';
import { Op } from 'sequelize';

interface IParamsProps {
    id?: number;
}

interface IBodyProps extends Omit<IUser, 'id'> {}

interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string
}

export class UserController {

    // Create
    static createValidation = validation((getSchema) => ({
        body: getSchema<IBodyProps>(yup.object().shape({
            fullName: yup.string().required().max(150),
            email: yup.string().required().max(150),
            cityId: yup.number().required().max(15),
        })),
        query: getSchema<IFilter>(yup.object().shape({
            filter: yup.string().min(3),
        }))
    }));

    static async create(req: Request<{}, {}, IBodyProps>, res: Response) {
        try {
            const {fullName, email, cityId} = req.body;

            const user = await User.create({
                fullName: fullName,
                email: email,
                cityId: cityId
            }, {
                include: [{
                    model: City,
                    as: 'city',
                    where: { id: cityId }
                }]
            });

            return res.status(StatusCodes.CREATED).json(user);
        } catch (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).json({msg: "Create new user failed!"});
        }
    };

    // Get All
    static getAllValidation = validation((getSchema) => ({
        query: getSchema<IQueryProps>(yup.object().shape({
            page: yup.number().moreThan(0),
            limit: yup.number().moreThan(0),
            filter: yup.string(),
            id: yup.number().integer().default(0),
        })),
    }));
    
    static getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
        try {
            const page = req.query.page || 1;
            const limit = req.query.limit || 10;
            const filter = req.query.filter || '';
    
            const users = await User.findAll({
                where: {
                    [Op.or]: [
                        {
                            fullName: {
                                [Op.like]: `%${filter}%`
                            }
                        },
                        {
                            email: {
                                [Op.like]: `%${filter}%`
                            }
                        }
                    ]
                },
                offset: (page - 1) * limit,
                limit: limit 
            });

            return res.status(StatusCodes.OK).json(users);
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.BAD_REQUEST).json({msg: `Error to get all users`})
        }
    };

    // Get by ID
    static getByIdValidation = validation((getSchema) => ({
        params: getSchema<IParamsProps>(yup.object().shape({
            id: yup.number().integer().required().moreThan(0)
        })),
    }));

    static getById = async (req: Request<IParamsProps>, res: Response) => {
        try {
            const user = await User.findByPk(req.params.id, { include: 'city' })
    
            return res.status(StatusCodes.OK).json(user);
        } catch (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).json({msg: `User not found`});
        }
    };

    // Update
    static updateByIdIdValidation = validation((getSchema) => ({
        body: getSchema<IBodyProps>(yup.object().shape({
            fullName: yup.string().required().min(150),
            email: yup.string().required().min(150),
            cityId: yup.number().required().min(150),
        })),
        params: getSchema<IParamsProps>(yup.object().shape({
            id: yup.number().integer().required().moreThan(0)
        })),
    }));
    
    static updateById = async (req: Request<IParamsProps>, res: Response) => {
        const user = await User.findByPk(req.params.id);
    
        if (user) {
            user.update({
                fullName: req.body.name,
                email: req.body.email,
                cityId: req.body.cityId
            });
            return res.status(StatusCodes.OK).json({msg: "User updated succefully!"})
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({msg: `User not found`})
        }
    };

    // Delete
    static deleteByIdIdValidation = validation((getSchema) => ({
        params: getSchema<IParamsProps>(yup.object().shape({
            id: yup.number().integer().required().moreThan(0)
        })),
    }));

    static deleteById = async (req: Request<IParamsProps>, res: Response) => {    
        const user = await User.findByPk(req.params.id);
    
        if (user) {
            await user.destroy()
            return res.status(StatusCodes.OK).json({msg: "User deleted!"})
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({msg: "User not found!"})
        }
    };
}