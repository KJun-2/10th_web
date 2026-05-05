export type commonRespons<T> = {
  status: boolean,
  statusCode: number,
  message: string,
  data: T
}
