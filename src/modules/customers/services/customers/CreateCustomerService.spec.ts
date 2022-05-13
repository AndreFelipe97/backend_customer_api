import 'reflect-metadata';
import { FakeCustomersRepository } from '@modules/customers/domain/repositories/fakes/FakeCustomerRepository';
import CreateCustomerService from './CreateCustomerService';
import AppError from '@shared/errors/AppError';

describe('Create Service', () => {
  it('should customer already registered', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();

    const createCustomerService = new CreateCustomerService(
      fakeCustomersRepository,
    );

    await createCustomerService.execute({
      name: 'fake-name',
      email: 'fake-email@gmail.com',
      phone: '85900000000',
      cpf: '00422435058',
    });

    expect(
      createCustomerService.execute({
        name: 'fake-name',
        email: 'fake-email@gmail.com',
        phone: '85900000000',
        cpf: '00422435058',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should invalid cpf', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();

    const createCustomerService = new CreateCustomerService(
      fakeCustomersRepository,
    );

    expect(
      createCustomerService.execute({
        name: 'fake-name',
        email: 'fake-email@gmail.com',
        phone: '85900000000',
        cpf: '00422435052',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should customer success registed', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();

    const createCustomerService = new CreateCustomerService(
      fakeCustomersRepository,
    );

    const customer = await createCustomerService.execute({
      name: 'fake-name',
      email: 'fake-email@gmail.com',
      phone: '85900000000',
      cpf: '29142502071',
    });

    expect(customer.message).toEqual('Cadastro realizado com sucesso!');
    expect(customer.statusCode).toEqual(200);
  });
});
