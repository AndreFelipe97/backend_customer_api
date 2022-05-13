export default interface IUpdateResponse<T> {
  statusCode: number;
  message: string;
  entitie: T;
}
