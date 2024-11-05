/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';

interface IProduct {
    name: string;
    categories: number[];
}

interface IFilter {
    filter?: string
}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IProduct>(yup.object().shape({
        name: yup.string().required().min(3),
        categories: yup.array().of(yup.number().required()).required()
    })),

    query: getSchema<IFilter>(yup.object().shape({
        filter: yup.string().min(3)
    }))
}))

export const create = async (req: Request<{}, {}, IProduct>, res: Response) => {
    return res.status(StatusCodes.CREATED).json(1);
}