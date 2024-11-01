/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from 'express';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';

interface ICidade {
    name: string;
}
interface IFilter {
    filter?: string;
}
export const createValidation = validation((getSchema) => ({
    body: getSchema<ICidade>(yup.object().shape({
        name: yup.string().required().min(3),
    })),
    query: getSchema<IFilter>(yup.object().shape({
        filter: yup.string().min(3),
    })),
}));

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
    console.log(req.body);
    
    return res.status(500).send('Não implementado!');
};