export interface RuntimeEvent {
  id: string;
  conversationId: string;
  type: string;
  metadata: Record<string, unknown> | null;
  durationMs: number | null;
  createdAt: string;
}

export interface RuntimeEventsResponse {
  success: boolean;
  data: RuntimeEvent[];
}
