import { createContext, useContext, useState } from 'react';
import { AuthenticationType } from '../types/ContexTypes';
import { AuthenticatedUser } from '../types/DefaultTypes';


const AuthenticationContext = createContext<AuthenticationType | undefined>(undefined);

const AuthenticationProvider = ({children}:{children: React.ReactNode}): React.ReactNode => {

  const [user, setUser] = useState<AuthenticatedUser | null>(null);

  const login = (user: AuthenticatedUser) => {
    setUser(() => user);
  }

  const logout = () => {
    setUser(() => null);
  }

  return (
    <AuthenticationContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  )
}

const useAuthentication = (): AuthenticationType => {

  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error('useAuthentication must be used within an AuthProvider')
  }

  return context;
}

export default useAuthentication;

export {
  AuthenticationProvider
}