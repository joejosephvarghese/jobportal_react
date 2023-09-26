import express from 'express';
import employerController from '../../../adapters/controllers/employerController';
import { employerDbRepository } from '../../../app/repositories/employerDbRepository';
import { EmployerRepositoryMongoDB } from '../../database/mongoDb/repositories/employerRepositoryMongoDB';
import { Employer } from '../../database/models/employerModel';
import { uploads } from '../middleware/multerCloudinary';
import authenticationMiddleware from '../middleware/authenticationMiddleware';
import roleMiddleware from '../middleware/roleMiddleware';

const employerMiddleware = roleMiddleware('employer');


const employerRouter = () => {
    const route = express.Router();

    const controller = employerController(
        employerDbRepository,
        EmployerRepositoryMongoDB,
        Employer
    );

    route.get('/employer-data',authenticationMiddleware, employerMiddleware, controller.getEmployerById);
    route.put('/update-employer',authenticationMiddleware, employerMiddleware, uploads, controller.updateEmployer);
    route.get('/employer-data/:empId', controller.getEmployerByIdParam);;
    route.get('/isverified',authenticationMiddleware, employerMiddleware,controller.checkEmployerVerified)
   

    return route;
}

export default employerRouter;