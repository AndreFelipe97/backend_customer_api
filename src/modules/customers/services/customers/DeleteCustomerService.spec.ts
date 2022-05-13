import 'reflect-metadata';
import { FakeCustomersRepository } from '@modules/customers/domain/repositories/fakes/FakeCustomerRepository';
import DeleteCustomerService from './DeleteCustomerService';
import CreateCustomerService from './CreateCustomerService';
import AppError from '@shared/errors/AppError';

describe('Delete Service', () => {
  it('should customer not found', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();

    const deleteCustomerService = new DeleteCustomerService(
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

    expect(deleteCustomerService.execute({ id: 10 })).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should customer success delete', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();

    const deleteCustomerService = new DeleteCustomerService(
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

    const customer = await deleteCustomerService.execute({ id: 1 });

    expect(customer.message).toEqual('Cliente excluido com sucesso!');
    expect(customer.statusCode).toEqual(201);
  });
});
