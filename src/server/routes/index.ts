import { Router } from 'express';
// import { StatusCodes } from 'http-status-codes';

// Controllers
import { CityController } from '../controllers/CityController';
import { UserController } from '../controllers/UserController';
import { ApartmentController } from '../controllers/ApartmentController';
import LoginController from '../controllers/LoginController';
import { ClientController } from '../controllers/ClientController';
import { ReservationController } from '../controllers/ReservationController';

// Service
import { ensureAuth } from '../shared/middlewares/EnsureAuth';

const router = Router();

// Apartment
router.get('/auth/apartments', ensureAuth, ApartmentController.getAllValidation, ApartmentController.getAll);
router.get('/auth/apartments/:id', ensureAuth, ApartmentController.getByIdValidation, ApartmentController.getById);
router.post('/auth/apartments', ensureAuth, ApartmentController.createValidation, ApartmentController.create);
router.put('/auth/apartments/:id', ensureAuth, ApartmentController.updateByIdIdValidation, ApartmentController.updateById);
router.delete('/auth/apartments/:id', ensureAuth, ApartmentController.deleteByIdIdValidation, ApartmentController.deleteById);

// Cities
router.get('/auth/cities', ensureAuth, CityController.getAllValidation, CityController.getAll);
router.get('/auth/cities/:id', ensureAuth, CityController.getByIdValidation, CityController.getById);
router.post('/auth/cities', ensureAuth, CityController.createValidation, CityController.create);
router.put('/auth/cities/:id', ensureAuth, CityController.updateByIdIdValidation, CityController.updateById);
router.delete('/auth/cities/:id', ensureAuth, CityController.deleteByIdIdValidation, CityController.deleteById);

// Clients
router.get('/auth/clients', ensureAuth, ClientController.getAllValidation, ClientController.getAll);
router.get('/auth/clients/:id', ensureAuth, ClientController.getByIdValidation, ClientController.getById);
router.post('/auth/clients', ensureAuth, ClientController.createValidation, ClientController.create);
router.put('/auth/clients/:id', ensureAuth, ClientController.updateByIdIdValidation, ClientController.updateById);
router.delete('/auth/clients/:id', ensureAuth, ClientController.deleteByIdIdValidation, ClientController.deleteById);

// User
router.get('/auth/users', ensureAuth, UserController.getAllValidation, UserController.getAll);
router.get('/auth/users/:id', ensureAuth, UserController.getByIdValidation, UserController.getById);
router.post('/auth/users', ensureAuth, UserController.createValidation, UserController.create);
router.put('/auth/users/:id', ensureAuth, UserController.updateByIdIdValidation, UserController.updateById);
router.delete('/auth/users/:id', ensureAuth, UserController.deleteByIdIdValidation, UserController.deleteById);

// Reservation
router.get('/auth/reservations', ensureAuth, ReservationController.getAllValidation, ReservationController.getAll);
router.get('/auth/reservations/:id', ensureAuth, ReservationController.getByIdValidation, ReservationController.getById);
router.post('/auth/reservations', ensureAuth, ReservationController.createValidation, ReservationController.create);
router.put('/auth/reservations/:id', ensureAuth, ReservationController.updateByIdIdValidation, ReservationController.updateById);
router.delete('/auth/reservations/:id', ensureAuth, ReservationController.deleteByIdIdValidation, ReservationController.deleteById);

// Login
router.post('/subscribe', LoginController.singUpValidation, LoginController.singUp);
router.post('/login', LoginController.singInValidation, LoginController.singIn);


export { router };