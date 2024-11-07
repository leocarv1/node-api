import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../shared/middlewares';
import { City } from '../models';

// Interfaces
import { ICity } from '../interfaces/ICity';
import { IFilter } from '../interfaces/IFilter';

import { CityService } from '../services/cities/CityService';
import { ICityService } from '../services/cities/CityService';
import { Op } from 'sequelize';

interface IParamsProps {
    id?: number;
}

interface IBodyProps extends Omit<ICity, 'id'> {}

interface IQueryProps {
    id?: number,
    page?: number;
    limit?: number;
    filter?: string
}

export class CityController {
    private service: ICityService;

    constructor(service: ICityService) {
        this.service = service;
    }

    // Create
    static createValidation = validation((getSchema) => ({
        body: getSchema<IBodyProps>(yup.object().shape({
            name: yup.string().required().min(3),
        })),
        query: getSchema<IFilter>(yup.object().shape({
            filter: yup.string().min(3),
        })),
    }));

    static async create(req: Request<{}, {}, IBodyProps>, res: Response) {
        try {
            const city = await City.create(req.body);
            return res.status(StatusCodes.CREATED).json(city);
        } catch (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).json({msg: "Create new city failed!"});
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
    
            const cities = await City.findAll({
                where: {
                    name: {
                        [Op.like]: `%${filter}%`
                    }
                },
                offset: (page - 1) * limit,
                limit: limit 
            });

            return res.status(StatusCodes.OK).json(cities);
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.BAD_REQUEST).json({msg: `Error to get all cities`})
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
            const city = await City.findByPk(req.params.id)
    
            return res.status(StatusCodes.OK).json(city);
        } catch (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).json({msg: `City not found`});
        }
    };

    // Update
    static updateByIdIdValidation = validation((getSchema) => ({
        body: getSchema<IBodyProps>(yup.object().shape({
            name: yup.string().required().min(3)
        })),
        params: getSchema<IParamsProps>(yup.object().shape({
            id: yup.number().integer().required().moreThan(0)
        })),
    }));
    
    static updateById = async (req: Request<IParamsProps>, res: Response) => {
        const city = await City.findByPk(req.params.id);
    
        if (city) {
            city.update({
                name: req.body.name
            });
            return res.status(StatusCodes.OK).json({msg: "City updated succefully!"})
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({msg: `City not found`})
        }
    };

    // Delete
    static deleteByIdIdValidation = validation((getSchema) => ({
        params: getSchema<IParamsProps>(yup.object().shape({
            id: yup.number().integer().required().moreThan(0)
        })),
    }));

    static deleteById = async (req: Request<IParamsProps>, res: Response) => {    
        const city = await City.findByPk(req.params.id);
    
        if (city) {
            await city.destroy()
            return res.status(StatusCodes.OK).json({msg: "City deleted!"})
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({msg: "City not found!"})
        }
    };
}