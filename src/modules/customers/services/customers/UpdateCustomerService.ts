import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { IUpdateCustomer } from '@modules/customers/domain/models/IUpdateCustomer';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import AppError from '@shared/errors/AppError';
import IUpdateResponse from '@shared/infra/http/InterfacesResponses/IUpdateResponse';
import { cpfValidator } from '@shared/utils/cpfValidator';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
    phone,
    cpf,
  }: IUpdateCustomer): Promise<IUpdateResponse<ICustomer>> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customere não encontrada!');
    }

    const isCpfValid = cpfValidator(cpf);

    if (!isCpfValid) {
      throw new AppError('Cpf inválido!', 422);
    }

    customer.name = name;
    customer.email = email;
    customer.phone = phone;

    await this.customersRepository.save(customer);

    return {
      statusCode: 200,
      message: 'Atualização realizada com sucesso!',
      entitie: customer,
    };
  }
}

export default UpdateCustomerService;
