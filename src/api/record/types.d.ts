import type { BasePaginationRequest } from '@/api/types';

export interface GetRecordQuery extends BasePaginationRequest {
  record?: string;
  amount?: number;
}

export interface RecordRecord {
  id: number;
  createdAt: string;
  updatedAt: string;
  record?: string;
  amount?: number;
}

export interface RecordRequestRecord {
  createdAt: Date;
  record?: string;
  amount?: number;
}
