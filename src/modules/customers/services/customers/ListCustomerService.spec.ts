import 'reflect-metadata';
import { FakeCustomersRepository } from '@modules/customers/domain/repositories/fakes/FakeCustomerRepository';
import ListCustomerService from './ListCustomerService';

describe('List Service', () => {
  it('should customer success registed', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();

    const createCustomerService = new ListCustomerService(
      fakeCustomersRepository,
    );

    const customer = await createCustomerService.execute();

    expect(customer.message).toEqual('Clientes encontrados!');
    expect(customer.statusCode).toEqual(201);
  });
});
