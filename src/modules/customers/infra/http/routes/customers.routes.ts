import { Router } from 'express';
import CustomersController from '../controllers/CustomersController';
import { celebrate, Joi, Segments } from 'celebrate';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.get('/', customersController.index);

customersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  customersController.show,
);

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      cpf: Joi.string().required(),
    },
  }),
  customersController.create,
);

customersRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      id: Joi.number().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      cpf: Joi.string().required(),
    },
  }),
  customersController.update,
);

customersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  customersController.delete,
);

export default customersRouter;
