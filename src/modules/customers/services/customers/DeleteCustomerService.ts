import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { IDeleteCustomer } from '@modules/customers/domain/models/IDeleteCustomer';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import AppError from '@shared/errors/AppError';
import IDeleteResponse from '@shared/infra/http/InterfacesResponses/IDeleteResponse';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository,
  ) {}

  public async execute({
    id,
  }: IDeleteCustomer): Promise<IDeleteResponse<ICustomer>> {
    const Customer = await this.customersRepository.findById(id);

    if (!Customer) {
      throw new AppError('Cliente não encontrado!');
    }

    await this.customersRepository.remove(Customer);

    return {
      statusCode: 201,
      message: 'Cliente excluido com sucesso!',
      entitie: Customer,
    };
  }
}

export default DeleteCustomerService;
