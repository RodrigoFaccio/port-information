import React from 'react';
import LoginContext from './LoginContext';
import useStorage from '../utils/useStorage';

const StoreProvider = ({ children }) => {
  const [token, setToken] = useStorage('token');

  return (
    <LoginContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}


export default StoreProvider;