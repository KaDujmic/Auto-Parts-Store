import { createContext } from 'react';


class AuthService {
  token
  role
  isLoggedIn = false
  setOnLogin (token, role) {
    this.role = role;
    this.token = token
    this.isLoggedIn = true;
  } 
  getUser () {
    return this.isLoggedIn ? { role: this.role, token: this.token } : undefined;
  }
}

const AuthContext = createContext(new AuthService())

export {
  AuthContext,
  AuthService
}
