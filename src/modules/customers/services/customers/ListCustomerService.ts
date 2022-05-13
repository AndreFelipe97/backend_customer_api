import { inject, injectable } from 'tsyringe';
import { IPaginate } from '@shared/domain/models/IPagiante';
import IListResponse from '@shared/infra/http/InterfacesResponses/IListResponse';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';

@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository,
  ) {}
  public async execute(): Promise<IListResponse<IPaginate<ICustomer>>> {
    const Customers = await this.customersRepository.findAllPaginate();

    return {
      message: 'Clientes encontrados!',
      statusCode: 201,
      entities: Customers as IPaginate<ICustomer>,
    };
  }
}

export default ListCustomerService;
