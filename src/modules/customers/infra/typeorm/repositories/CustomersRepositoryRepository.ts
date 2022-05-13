import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { IPaginate } from '@shared/domain/models/IPagiante';
import { getRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

export class CustomersRepository implements ICustomerRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async findById(id: number): Promise<ICustomer | undefined> {
    const client = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return client;
  }

  public async findByCpf(cpf: string): Promise<ICustomer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        cpf,
      },
    });

    return customer;
  }

  public async findAll(): Promise<ICustomer[] | undefined> {
    const customers = await this.ormRepository.find();
    return customers;
  }

  public async findAllPaginate(): Promise<IPaginate<ICustomer>> {
    const customer = await this.ormRepository.createQueryBuilder().paginate();
    return customer as IPaginate<ICustomer>;
  }

  public async remove(customer: ICustomer): Promise<void> {
    await this.ormRepository.remove(customer);
  }

  public async create({
    name,
    email,
    phone,
    cpf,
  }: ICreateCustomer): Promise<Customer> {
    const customer = this.ormRepository.create({ name, email, phone, cpf });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    await this.ormRepository.save(customer);

    return customer;
  }
}
