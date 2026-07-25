export const AUTH_EVENTS = {
  LOGIN: "auth:login",

  LOGOUT: "auth:logout",

  SESSION_EXPIRED: "auth:session-expired",
} as const;

export function emitAuthEvent(event: string) {
  window.dispatchEvent(new Event(event));
}
