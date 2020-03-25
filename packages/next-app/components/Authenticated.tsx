import React from 'react';
import { useAuth } from '@app/hooks';

const Component: React.FC<any> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated && children;
};

export default Component;
