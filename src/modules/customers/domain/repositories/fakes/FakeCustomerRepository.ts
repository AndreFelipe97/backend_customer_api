import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { IPaginate } from '@shared/domain/models/IPagiante';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

export class FakeCustomersRepository implements ICustomerRepository {
  private customers: Array<ICustomer> = [];

  public async findById(id: number): Promise<ICustomer | undefined> {
    const customer = this.customers.find(customer => customer.id === id);
    return customer;
  }

  public async findByCpf(cpf: string): Promise<ICustomer | undefined> {
    const customer = this.customers.find(customer => customer.cpf === cpf);
    return customer;
  }

  public async findAll(): Promise<ICustomer[] | undefined> {
    const customers = this.customers;
    return customers;
  }

  public async findAllPaginate(): Promise<IPaginate<ICustomer>> {
    return {
      from: 1,
      to: 1,
      per_page: 1,
      total: 1,
      current_page: 1,
      prev_page: null,
      next_page: null,
      last_page: 1,
      data: this.customers,
    };
  }

  public async remove(customer: ICustomer): Promise<void> {
    this.customers.pop();
  }

  public async create({
    name,
    email,
    phone,
    cpf,
  }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();

    customer.id = this.customers.length + 1;
    customer.name = name;
    customer.email = email;
    customer.phone = phone;
    customer.cpf = cpf;

    this.customers.push(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    Object.assign(this.customers, customer);

    return customer;
  }
}
