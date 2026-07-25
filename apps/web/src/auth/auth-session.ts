import { authStorage } from "./auth-storage";
import { AUTH_EVENTS, emitAuthEvent } from "./auth-events";

export const authSession = {
  login(token: string) {
    authStorage.setToken(token);

    emitAuthEvent(AUTH_EVENTS.LOGIN);
  },

  logout() {
    authStorage.removeToken();

    emitAuthEvent(AUTH_EVENTS.LOGOUT);

    window.location.href = "/auth/login";
  },

  isAuthenticated() {
    return !!authStorage.getToken();
  },
};
