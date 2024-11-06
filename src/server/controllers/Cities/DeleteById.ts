/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';


import { validation } from '../../shared/middlewares';
import City from '../../models/City';

interface IParamsProps {
    id?: number;
}

export const deleteByIdIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0)
    })),
}));

export const deleteById = async (req: Request<IParamsProps>, res: Response) => {
    if (Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: 'Registro não encontrado'
        }
    });

    const city = await City.findByPk(req.params.id);

    if (city) {
        await city.destroy()
        return res.status(StatusCodes.OK).json({msg: "City deleted!"})
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({msg: "City not found!"})
    }
};