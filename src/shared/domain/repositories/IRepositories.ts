import { IPaginate } from '@shared/domain/models/IPagiante';

export interface IRepository<T, C> {
  findAll(): Promise<T[] | undefined>;
  findAllPaginate(): Promise<IPaginate<T>>;
  findById(id: number): Promise<T | undefined>;
  findByCpf(cpf: string): Promise<T | undefined>;
  create(data: C): Promise<T>;
  save(data: T): Promise<T>;
  remove(data: T): Promise<void>;
}
