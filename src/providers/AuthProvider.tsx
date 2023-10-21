import { ReactNode, createContext, useState } from 'react';
import { fakeAuth } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/user';

export type ContextType = {
  user: User | null;
  onLogin: (user: User) => Promise<void>;
  onLogout: () => void;
};

export const AuthContext = createContext<ContextType | null>(null);

interface Props {
  children: ReactNode;
}
const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async (user: User) => {
    await fakeAuth();
    setUser(user);
    navigate('/');
  };

  const handleLogout = () => {
    setUser(null);
  };

  const value = {
    user,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
