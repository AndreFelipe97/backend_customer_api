import customersRouter from '@modules/customers/infra/http/routes/customers.routes';
import { Request, Response, Router } from 'express';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Hello, Welcome!' });
});

routes.use('/customers', customersRouter);

export default routes;
