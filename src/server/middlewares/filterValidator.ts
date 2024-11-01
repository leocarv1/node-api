import { RequestHandler } from "express";
import * as yup from 'yup'
import { IFilter } from '../interfaces/IFilter'

const queryValidation: yup.ObjectSchema<IFilter> = yup.object().shape({
    filter: yup.string().required().min(3),
});

export const createQueryValidator: RequestHandler = async (req, res, next) => {
    try {
        await queryValidation.validate(req.query, { abortEarly: false })
        return next();
    } catch (err) {
        const yupError = err as yup.ValidationError;
        const errors: Record<string, string> = {}

        yupError.inner.forEach( error => {
            if (error.path === undefined) return;
            errors[error.path] = error.message
        });

        return res.status(400).json({ errors })
    }
}