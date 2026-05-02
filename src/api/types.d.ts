export interface BaseResponseBody<T = unknown> {
  success: boolean;
  code: number;
  msg: string;
  data: T;
}

export interface BasePaginationRequest {
  page?: number;
  pageSize?: number;
}

export interface PaginatedData<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}
