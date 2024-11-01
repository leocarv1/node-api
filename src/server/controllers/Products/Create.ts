import { Request, Response } from 'express'
import * as yup from 'yup';

// Interface
import { IProducts } from '../../models/Products'

const bodyValidation: yup.ObjectSchema<IProducts> = yup.object().shape({
    name: yup.string().required().max(155),
    description: yup.string().required().max(155)
})

export const create = async (req: Request, res: Response) => {

    let validateData: IProducts | undefined = undefined

    try {
        validateData = await bodyValidation.validate(req.body);
    } catch (err) {
        const yupError = err as yup.ValidationError
        return res.json({
            errors: {
                default: yupError.message
            }
        })
    }

    console.log(validateData);
    res.send("Create Products")
}