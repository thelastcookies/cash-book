import type { BaseResponseBody, PaginatedData } from '@/api/base/types';
import type { GetRecordQuery, RecordRecord, RecordRequestRecord } from '@/api/record/types';

export const getRecords = (params: GetRecordQuery) => {
  return useGet<BaseResponseBody<PaginatedData<RecordRecord>>, GetRecordQuery>(
    `${BASE_URL}/api/record`,
    params,
  );
};

export const getRecordById = (id: number) => {
  return useGet<BaseResponseBody<RecordRecord>>(
    `${BASE_URL}/api/record/${id}`,
  );
};

export const saveRecord = (data: RecordRequestRecord) => {
  return usePost<BaseResponseBody<RecordRecord>, RecordRequestRecord>(
    `${BASE_URL}/api/record`,
    data,
  );
};

export const deleteRecord = (id: number) => {
  return useDelete<BaseResponseBody<RecordRecord>>(
    `${BASE_URL}/api/record/${id}`,
  );
};
