export interface AuditLog {
  id: string;

  action: string;

  resource: string;

  userId: string;

  createdAt: string;
}

export interface AuditResponse {
  items: AuditLog[];

  page: number;

  limit: number;

  total: number;

  totalPages: number;
}
