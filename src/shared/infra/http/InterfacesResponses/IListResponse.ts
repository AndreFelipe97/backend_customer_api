export default interface IListResponse<T> {
  statusCode: number;
  message: string;
  entities: T;
}
