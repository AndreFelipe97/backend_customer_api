export default interface IShowResponse<T> {
  statusCode: number;
  message: string;
  entitie: T;
}
