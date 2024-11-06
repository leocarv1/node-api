/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';

// Models
import City from '../../models/City';
import { ICity } from '../../interfaces/ICity';

interface IParamsProps {
    id?: number;
}

interface IBodyProps extends Omit<ICity, 'id'> {}

export const updateByIdIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required().min(3)
    })),
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0)
    })),
}));

export const updateById = async (req: Request<IParamsProps>, res: Response) => {
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