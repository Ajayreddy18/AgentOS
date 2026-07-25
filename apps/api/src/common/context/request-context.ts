import { AsyncLocalStorage } from "node:async_hooks";

export interface RequestContext {
  requestId: string;
  userId?: string;
  conversationId?: string;
}

const storage = new AsyncLocalStorage<RequestContext>();

export class RequestContextService {
  static run<T>(context: RequestContext, callback: () => T): T {
    return storage.run(context, callback);
  }

  static get(): RequestContext | undefined {
    return storage.getStore();
  }

  static set(values: Partial<RequestContext>) {
    const context = storage.getStore();

    if (!context) {
      return;
    }

    Object.assign(context, values);
  }
}
