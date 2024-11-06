import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';
import City from '../../models/City';

interface IParamsProps {
    id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0)
    })),
}));

export const getById = async (req: Request<IParamsProps>, res: Response) => {
    try {
        const city = await City.findByPk(req.params.id)

        return res.status(StatusCodes.OK).json(city);
    } catch (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).json({msg: `City not found`});
    }
};