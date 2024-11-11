import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../shared/middlewares';
import { Apartment, City, User } from '../models';

// Interfaces
import { IApartment } from '../interfaces/IApartment';
import { IFilter } from '../interfaces/IFilter';
import { Op } from 'sequelize';

interface IParamsProps {
    id?: number;
}

interface IBodyProps extends Omit<IApartment, 'id'> {}

interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string
}

export class ApartmentController {

    // Create
    static createValidation = validation((getSchema) => ({
        body: getSchema<IBodyProps>(yup.object().shape({
            number: yup.number().required().max(15),
            floor: yup.number().required().max(15),
        })),
        query: getSchema<IFilter>(yup.object().shape({
            filter: yup.string().min(3),
        }))
    }));

    static async create(req: Request<{}, {}, IBodyProps>, res: Response) {
        try {
            const apartment = await Apartment.create(req.body);

            return res.status(StatusCodes.CREATED).json(apartment);
        } catch (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).json({msg: "Create new apartment failed!"});
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
    
            const apartments = await Apartment.findAll({
                where: {
                    [Op.or]: [
                        {
                            number: {
                                [Op.eq]: `%${filter}%`
                            }
                        },
                        {
                            floor: {
                                [Op.eq]: `%${filter}%`
                            }
                        }
                    ]
                },
                offset: (page - 1) * limit,
                limit: limit 
            });

            return res.status(StatusCodes.OK).json(apartments);
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.BAD_REQUEST).json({msg: `Error to get all apartments`})
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
            const apartment = await Apartment.findByPk(req.params.id);
    
            return res.status(StatusCodes.OK).json(apartment);
        } catch (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).json({msg: `Apartment not found`});
        }
    };

    // Update
    static updateByIdIdValidation = validation((getSchema) => ({
        body: getSchema<IBodyProps>(yup.object().shape({
            number: yup.number().required().min(150),
            floor: yup.number().required().min(150),
        })),
        params: getSchema<IParamsProps>(yup.object().shape({
            id: yup.number().integer().required().moreThan(0)
        })),
    }));
    
    static updateById = async (req: Request<IParamsProps>, res: Response) => {
        const apartment = await Apartment.findByPk(req.params.id);
    
        if (apartment) {
            apartment.update(req.body);
            return res.status(StatusCodes.OK).json({msg: "Apartment updated succefully!"});
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({msg: `Apartment not found`});
        }
    };

    // Delete
    static deleteByIdIdValidation = validation((getSchema) => ({
        params: getSchema<IParamsProps>(yup.object().shape({
            id: yup.number().integer().required().moreThan(0)
        })),
    }));

    static deleteById = async (req: Request<IParamsProps>, res: Response) => {    
        const apartment = await Apartment.findByPk(req.params.id);
    
        if (apartment) {
            await apartment.destroy();
            return res.status(StatusCodes.OK).json({msg: "Apartment deleted!"});
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({msg: "Apartment not found!"});
        }
    };
}