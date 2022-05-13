import 'reflect-metadata';
import { FakeCustomersRepository } from '@modules/customers/domain/repositories/fakes/FakeCustomerRepository';
import UpdateCustomerService from './UpdateCustomerService';
import CreateCustomerService from './CreateCustomerService';
import AppError from '@shared/errors/AppError';

describe('Update Service', () => {
  it('should customer not found', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();

    const updateCustomerService = new UpdateCustomerService(
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

    expect(
      updateCustomerService.execute({
        id: 10,
        name: 'fake-name',
        email: 'fake-email@gmail.com',
        phone: '85900000000',
        cpf: '29142502071',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should invalid cpf', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();

    const updateCustomerService = new UpdateCustomerService(
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

    expect(
      updateCustomerService.execute({
        id: 1,
        name: 'fake-name',
        email: 'fake-email@gmail.com',
        phone: '85900000000',
        cpf: '29142502070',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should customer success updated', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();

    const updateCustomerService = new UpdateCustomerService(
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

    const customer = await updateCustomerService.execute({
      id: 1,
      name: 'fake-name',
      email: 'fake-email@gmail.com',
      phone: '85900000000',
      cpf: '55525787083',
    });

    expect(customer.message).toEqual('Atualização realizada com sucesso!');
    expect(customer.statusCode).toEqual(200);
  });
});
