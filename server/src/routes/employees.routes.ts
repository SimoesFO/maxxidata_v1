import { Router } from 'express';
import EmployeesController from '../app/controllers/EmployeesController';
import employeeSchema from '../app/validations/employeeValidate';
import validation from '../middlewares/validationMiddleware';

const routesEmployees = Router();

routesEmployees.post(
  '/',
  validation(employeeSchema),
  EmployeesController.create,
);
routesEmployees.get('/', EmployeesController.index);
routesEmployees.get('/:id', EmployeesController.show);
routesEmployees.put(
  '/:id',
  validation(employeeSchema),
  EmployeesController.update,
);
routesEmployees.delete('/:id', EmployeesController.destroy);

export default routesEmployees;
