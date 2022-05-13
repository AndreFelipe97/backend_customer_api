import DeleteCustomerService from '@modules/customers/services/customers/DeleteCustomerService';
import ListCustomerService from '@modules/customers/services/customers/ListCustomerService';
import ShowCustomerService from '@modules/customers/services/customers/ShowCustomerService';
import UpdateCustomerService from '@modules/customers/services/customers/UpdateCustomerService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCustomerService from '../../../services/customers/CreateCustomerService';

export default class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listClients = container.resolve(ListCustomerService);

    const clients = await listClients.execute();

    return response.json(clients);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showClient = container.resolve(ShowCustomerService);

    const client = await showClient.execute({ id: Number(id) });

    return response.json(client);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, phone, cpf } = request.body;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({ name, email, phone, cpf });

    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, phone, cpf } = request.body;
    const { id } = request.params;

    const updateClient = container.resolve(UpdateCustomerService);

    const client = await updateClient.execute({
      id: Number(id),
      name,
      email,
      phone,
      cpf,
    });

    return response.json(client);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteClient = container.resolve(DeleteCustomerService);

    const client = await deleteClient.execute({ id: Number(id) });

    return response.json(client);
  }
}
