import { Router } from 'express';
// import { StatusCodes } from 'http-status-codes';

// Controllers
import { ProductsController } from '../controllers'
import { CityController } from '../controllers/Cities/CityController';

const router = Router();

// Cities
router.get('/cities', CityController.getAllValidation, CityController.getAll);
router.get('/cities/:id', CityController.getByIdValidation, CityController.getById);
router.post('/cities', CityController.createValidation, CityController.create);
router.put('/cities/:id', CityController.updateByIdIdValidation, CityController.updateById);
router.delete('/cities/:id', CityController.deleteByIdIdValidation, CityController.deleteById);

// Products
router.get('/products', ProductsController.getAllValidation, ProductsController.getAll);
router.get('/products/:id', ProductsController.getByIdValidation, ProductsController.getById);
router.post('/products', ProductsController.createValidation, ProductsController.create);
router.put('/products/:id', ProductsController.updateByIdIdValidation, ProductsController.updateById);
router.delete('/products/:id', ProductsController.deleteByIdIdValidation, ProductsController.deleteById);


export { router };