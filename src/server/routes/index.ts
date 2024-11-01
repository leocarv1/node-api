import { Router } from 'express';
// import { StatusCodes } from 'http-status-codes';

import { CityController, ProductsController } from '../controllers'

// Middlewares
import { createQueryValidator } from '../middlewares/filterValidator';

const router = Router();

// router.all("/", createQueryValidator);

// Cities
router.post('/cities', CityController.createValidation, CityController.create);

// Products
router.post('/products', ProductsController.create);


export { router }