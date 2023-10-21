import { useContext } from 'react';
import { ContextType, AuthContext } from '../providers/AuthProvider';

export const useAuth = () => {
  const context = useContext(AuthContext) || {};
  return context as ContextType;
};
