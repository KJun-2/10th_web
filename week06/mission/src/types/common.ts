import { PAGINATION_ORDER } from '../enums/common';
export type commonRespons<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export type CursorBasedResponse<T> = commonRespons<{
  data: T;
  nextCursor: number | null;
  hasNext: boolean;
}>;

export type PaginationDto = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: PAGINATION_ORDER;
};
