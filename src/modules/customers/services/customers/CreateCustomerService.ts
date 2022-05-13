import AppError from '@shared/errors/AppError';
import ICreateResponse from '@shared/infra/http/InterfacesResponses/ICreateResponse';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { inject, injectable } from 'tsyringe';
import { cpfValidator } from '@shared/utils/cpfValidator';

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository,
  ) {}

  public async execute({
    name,
    email,
    phone,
    cpf,
  }: ICreateCustomer): Promise<ICreateResponse<ICustomer>> {
    const customerExists = await this.customersRepository.findByCpf(cpf);

    if (customerExists) {
      throw new AppError('Você já possui um cadastro!', 401);
    }

    const isCpfValid = cpfValidator(cpf);

    if (!isCpfValid) {
      throw new AppError('Cpf inválido!', 422);
    }

    const customer = await this.customersRepository.create({
      name,
      email,
      phone,
      cpf,
    });

    return {
      statusCode: 200,
      message: 'Cadastro realizado com sucesso!',
      entitie: customer,
    };
  }
}

export default CreateCustomerService;
