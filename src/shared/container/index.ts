import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepositoryRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICustomerRepository>(
  'CustomersRepository',
  CustomersRepository,
);
