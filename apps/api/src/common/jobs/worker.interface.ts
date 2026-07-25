export interface Worker {
  start(): Promise<void>;

  stop(): Promise<void>;
}
