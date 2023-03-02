import React from 'react';
import { createContext, useMemo } from 'react';



const AuthContext = createContext(null)

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState(null);

  return (
    <AuthContext.Provider
      value={useMemo(() => ({ currentUser, setCurrentUser }), [
        currentUser,
        setCurrentUser,
      ])}
    >
      {children}
    </AuthContext.Provider>
  );
}

class UserInfo {
  constructor(token, role) {
    this.token = token;
    this.role = role;
  }

  getInfo() {
    return { token: this.token, role: this.role }  
  }
}

export { UserInfo, AuthProvider, AuthContext }