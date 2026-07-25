export interface AuditLog {
  id: string;

  action: string;

  resource: string;

  userId: string;

  createdAt: Date;
}

export interface AuditQuery {
  page: number;

  limit: number;

  search?: string;

  severity?: string;

  action?: string;

  actor?: string;

  resource?: string;

  sort?: "asc" | "desc";
}

export interface AuditListResponse<T> {
  items: T[];

  page: number;

  limit: number;

  total: number;

  totalPages: number;
}
