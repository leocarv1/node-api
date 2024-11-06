/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';

// Model
import City from '../../models/City';
import { ICity } from '../../interfaces/ICity';

interface IBodyProps extends Omit<ICity, 'id'> {}

interface IFilter {
    filter?: string;
}
export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required().min(3),
    })),
    query: getSchema<IFilter>(yup.object().shape({
        filter: yup.string().min(3),
    })),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {  
    
    const city = await City.create({
        name: req.body.name
    });

    return res.status(StatusCodes.CREATED).json(city);
};