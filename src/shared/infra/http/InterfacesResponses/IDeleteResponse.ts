export default interface IDeleteResponse<T> {
  statusCode: number;
  message: string;
  entitie: T;
}
