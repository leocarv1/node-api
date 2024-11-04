/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from 'express';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';

interface IParamsProps {
    id?: number;
}

export const deleteByIdIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0)
    })),
}));

export const deleteById = async (req: Request<{}, {}, {}, IParamsProps>, res: Response) => {
    console.log(req.params);
    
    return res.status(500).send('deleteById Não implementado!');
};