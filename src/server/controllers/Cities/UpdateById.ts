/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from 'express';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';

interface IParamsProps {
    id?: number;
}

interface IBodyProps {
    name: string
}

export const updateByIdIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required().min(3)
    })),
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0)
    })),
}));

export const updateById = async (req: Request<{}, {}, {}, IParamsProps>, res: Response) => {
    console.log(req.body)
    console.log(req.params);
    
    return res.status(500).send('UpdateById Não implementado!');
};