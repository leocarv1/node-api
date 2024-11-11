import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../shared/middlewares';
import { Apartment, City, Client, Reservation } from '../models';

// Interfaces
import { IReservation } from '../interfaces/IReservation';
import { IFilter } from '../interfaces/IFilter';
import { Op } from 'sequelize';

interface IParamsProps {
    id?: number;
}

interface IBodyProps extends Omit<IReservation, 'id'> {}

interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string
}

export class ReservationController {

    // Create
    static createValidation = validation((getSchema) => ({
        body: getSchema<IBodyProps>(yup.object().shape({
            apartment_id: yup.number().required().max(15),
            client_id: yup.number().required().max(15),
            days: yup.number().required().max(15),
            active: yup.bool().required(),
            date_initial: yup.date().required(),
        })),
        query: getSchema<IFilter>(yup.object().shape({
            filter: yup.string().min(3),
        }))
    }));

    static async create(req: Request<{}, {}, IBodyProps>, res: Response) {
        const verifyReservation = await Reservation.verifyReservation(req.body.apartment_id, req.body.date_initial);

        if (!verifyReservation) {
            try {
                const reservation = await Reservation.create(req.body, {
                    include: [{
                        model: Apartment,
                        as: 'apartment',
                        where: { id: req.body.apartment_id }
                    },{
                        model: Client,
                        as: 'client',
                        where: { id: req.body.client_id }
                    }]
                });

                return res.status(StatusCodes.CREATED).json(reservation);
            } catch (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).json({msg: "Create new reservation failed!"});
            }
        } else {
            return res.status(StatusCodes.OK).json({msg: "Reservation failed! Choose another date"});
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
    
            const reservations = await Reservation.findAll({
                where: {
                    [Op.or]: [
                        {
                            apartment_id: {
                                [Op.eq]: `%${filter}%`
                            }
                        },
                        {
                            client_id: {
                                [Op.eq]: `%${filter}%`
                            }
                        }
                    ]
                },
                offset: (page - 1) * limit,
                limit: limit 
            });

            return res.status(StatusCodes.OK).json(reservations);
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.BAD_REQUEST).json({msg: `Error to get all reservations`})
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
            const reservation = await Reservation.findByPk(req.params.id, { include: [
                {
                    model: Apartment, as: 'apartment'
                },
                {
                    model: Client, as: 'client'
                }
            ] })
    
            return res.status(StatusCodes.OK).json(reservation);
        } catch (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).json({msg: `Reservation not found`});
        }
    };

    // Update
    static updateByIdIdValidation = validation((getSchema) => ({
        body: getSchema<IBodyProps>(yup.object().shape({
            apartment_id: yup.number().required().max(15),
            client_id: yup.number().required().max(15),
            days: yup.number().required().max(15),
            active: yup.bool().required(),
            date_initial: yup.date().required(),
        })),
        params: getSchema<IParamsProps>(yup.object().shape({
            id: yup.number().integer().required().moreThan(0)
        })),
    }));
    
    static updateById = async (req: Request<IParamsProps>, res: Response) => {
        const reservation = await Reservation.findByPk(req.params.id);
    
        if (reservation) {
            reservation.update(req.body);
            return res.status(StatusCodes.OK).json({msg: "Reservation updated succefully!"})
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({msg: `Reservation not found`})
        }
    };

    // Delete
    static deleteByIdIdValidation = validation((getSchema) => ({
        params: getSchema<IParamsProps>(yup.object().shape({
            id: yup.number().integer().required().moreThan(0)
        })),
    }));

    static deleteById = async (req: Request<IParamsProps>, res: Response) => {    
        const reservation = await Reservation.findByPk(req.params.id);
    
        if (reservation) {
            await reservation.update({
                active: false
            });

            reservation.save();
            return res.status(StatusCodes.OK).json({msg: "Reservation caceled!"});
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({msg: "Reservation not found!"});
        }
    };
}