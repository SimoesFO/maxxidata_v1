import { Router } from 'express';
import OccupationsController from '../app/controllers/OccupationsController';
import occupationSchema from '../app/validations/occupationValidate';
import validation from '../middlewares/validationMiddleware';

const routesOccupations = Router();

routesOccupations.post(
  '/',
  validation(occupationSchema),
  OccupationsController.create,
);
routesOccupations.get('/', OccupationsController.index);
routesOccupations.get('/:id', OccupationsController.show);
routesOccupations.put(
  '/:id',
  validation(occupationSchema),
  OccupationsController.update,
);
routesOccupations.delete('/:id', OccupationsController.destroy);

export default routesOccupations;
