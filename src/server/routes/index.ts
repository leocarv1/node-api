import { Router } from 'express';
// import { StatusCodes } from 'http-status-codes';

import { CityController, ProductsController } from '../controllers'

const router = Router();

// router.all("/", createQueryValidator);

// Cities
router.get('/cities',CityController.getAllValidation, CityController.getAll);
router.get('/cities/:id',CityController.getByIdValidation, CityController.getById);
router.post('/cities', CityController.createValidation, CityController.create);
router.put('/cities/:id', CityController.updateByIdIdValidation, CityController.updateById);

// Products
router.post('/products', ProductsController.create);


export { router };