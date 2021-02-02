import jwtDecode from "jwt-decode";
import { TOKEN } from '../config/server';

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(TOKEN);
    return jwtDecode(jwt);
  } catch (ex) {
    return {};
  }
}

