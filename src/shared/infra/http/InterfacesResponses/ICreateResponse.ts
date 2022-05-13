export default interface ICreateResponse<T> {
  statusCode: number;
  message: string;
  entitie: T;
}
