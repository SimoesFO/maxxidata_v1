import { Router } from 'express';
import routesEmployees from './employees.routes';
import routesOccupations from './occupations.routes';

const routes = Router();

routes.get('/', (req, res) => {
  res.send('Its working!');
});

routes.use('/api/v1/occupations', routesOccupations);
routes.use('/api/v1/employees', routesEmployees);

export default routes;
