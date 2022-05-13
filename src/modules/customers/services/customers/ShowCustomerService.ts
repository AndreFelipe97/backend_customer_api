import AppError from '@shared/errors/AppError';
import IShowResponse from '@shared/infra/http/InterfacesResponses/IShowResponse';
import { inject, injectable } from 'tsyringe';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { IShowCustomer } from '@modules/customers/domain/models/IShowCustomer';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';

@injectable()
class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository,
  ) {}

  public async execute({
    id,
  }: IShowCustomer): Promise<IShowResponse<ICustomer>> {
    const Customer = await this.customersRepository.findById(id);

    if (!Customer) {
      throw new AppError('Cliente não encontrado não encontrado!', 401);
    }

    return {
      statusCode: 201,
      message: 'Cliente encontrado!',
      entitie: Customer,
    };
  }
}

export default ShowCustomerService;
