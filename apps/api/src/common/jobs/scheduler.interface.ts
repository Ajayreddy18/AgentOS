export interface Scheduler {
  start(): Promise<void>;

  stop(): Promise<void>;
}
