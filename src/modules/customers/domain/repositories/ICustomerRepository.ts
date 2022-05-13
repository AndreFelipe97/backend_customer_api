import { IRepository } from '@shared/domain/repositories/IRepositories';
import { ICustomer } from '../models/ICustomer';
import { ICreateCustomer } from '../models/ICreateCustomer';

export type ICustomerRepository = IRepository<ICustomer, ICreateCustomer>;
