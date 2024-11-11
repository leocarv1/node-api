import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../shared/middlewares';

// Interfaces
import { IClient } from '../interfaces/IClient';
import { IFilter } from '../interfaces/IFilter';
import { Op } from 'sequelize';
import Client from '../models/Client';

interface IParamsProps {
    id?: number;
}

interface IBodyProps extends Omit<IClient, 'id'> {}

interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string
}

export class ClientController {

    // Create
    static createValidation = validation((getSchema) => ({
        body: getSchema<IBodyProps>(yup.object().shape({
            fullName: yup.string().required().max(150),
            email: yup.string().required().max(150),
            phone: yup.string().required().max(15),
            doc: yup.string().required().max(15),
        })),
        query: getSchema<IFilter>(yup.object().shape({
            filter: yup.string().min(3),
        }))
    }));

    static async create(req: Request<{}, {}, IBodyProps>, res: Response) {
        try {
            const client = await Client.create(req.body);

            return res.status(StatusCodes.CREATED).json(client);
        } catch (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).json({msg: "Create new client failed!"});
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
    
            const clients = await Client.findAll({
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

            return res.status(StatusCodes.OK).json(clients);
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.BAD_REQUEST).json({msg: `Error to get all clients`})
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
            const client = await Client.findByPk(req.params.id);
    
            return res.status(StatusCodes.OK).json(client);
        } catch (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).json({msg: `Client not found`});
        }
    };

    // Update
    static updateByIdIdValidation = validation((getSchema) => ({
        body: getSchema<IBodyProps>(yup.object().shape({
            fullName: yup.string().required().max(150),
            email: yup.string().required().max(150),
            phone: yup.string().required().max(15),
            doc: yup.string().required().max(15),
        })),
        params: getSchema<IParamsProps>(yup.object().shape({
            id: yup.number().integer().required().moreThan(0)
        })),
    }));
    
    static updateById = async (req: Request<IParamsProps>, res: Response) => {
        const client = await Client.findByPk(req.params.id);
    
        if (client) {
            client.update(req.body);
            return res.status(StatusCodes.OK).json({msg: "Client updated succefully!"})
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({msg: `Client not found`})
        }
    };

    // Delete
    static deleteByIdIdValidation = validation((getSchema) => ({
        params: getSchema<IParamsProps>(yup.object().shape({
            id: yup.number().integer().required().moreThan(0)
        })),
    }));

    static deleteById = async (req: Request<IParamsProps>, res: Response) => {    
        const client = await Client.findByPk(req.params.id);
    
        if (client) {
            await client.destroy()
            return res.status(StatusCodes.OK).json({msg: "Client deleted!"})
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({msg: "Client not found!"})
        }
    };
}