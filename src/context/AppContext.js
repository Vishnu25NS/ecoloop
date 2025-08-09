import React, { useContext, createContext } from 'react';

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export default AppContext;