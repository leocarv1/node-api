/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';
import City from '../../models/City';

interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string
}

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().moreThan(0),
        limit: yup.number().moreThan(0),
        filter: yup.string(),
    })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    try {
        const cities = await City.findAll();
        return res.status(StatusCodes.OK).json(cities);
    } catch (err) {
        console.log(err)
        return res.status(StatusCodes.BAD_REQUEST).json({msg: `Error to get all cities`})
    }
};