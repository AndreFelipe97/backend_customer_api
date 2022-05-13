import 'reflect-metadata';
import { FakeCustomersRepository } from '@modules/customers/domain/repositories/fakes/FakeCustomerRepository';
import ShowCustomerService from './ShowCustomerService';
import CreateCustomerService from './CreateCustomerService';
import AppError from '@shared/errors/AppError';

describe('Show Service', () => {
  it('should customer not found', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();

    const showCustomerService = new ShowCustomerService(
      fakeCustomersRepository,
    );

    const createCustomerService = new CreateCustomerService(
      fakeCustomersRepository,
    );

    await createCustomerService.execute({
      name: 'fake-name',
      email: 'fake-email@gmail.com',
      phone: '85900000000',
      cpf: '29142502071',
    });

    expect(showCustomerService.execute({ id: 10 })).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should customer found', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();

    const showCustomerService = new ShowCustomerService(
      fakeCustomersRepository,
    );

    const createCustomerService = new CreateCustomerService(
      fakeCustomersRepository,
    );

    await createCustomerService.execute({
      name: 'Ismael',
      email: 'ismael@gmail.com',
      phone: '85900000000',
      cpf: '29142502071',
    });

    const customer = await showCustomerService.execute({ id: 1 });

    expect(customer.message).toEqual('Cliente encontrado!');
    expect(customer.statusCode).toEqual(201);
  });
});
