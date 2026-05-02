import type { BasePaginationRequest } from '@/api/base/types'

export interface GetRecordQuery extends BasePaginationRequest {
  record?: string
  amount?: number
}

export interface RecordRecord {
  id: number
  createdAt: string
  updatedAt: string
  record?: string
  amount?: number
}

export interface RecordRequestRecord {
  record?: string
  amount?: number
}
