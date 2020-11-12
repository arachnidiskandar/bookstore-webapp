import React, { useState } from 'react';

export const LoadingContext = React.createContext();

export const LoadingProvider = ({ children }) => {
  const [loadingState, setLoadingState] = useState(false);
  return (
    <LoadingContext.Provider value={[loadingState, setLoadingState]}>
      {children}
    </LoadingContext.Provider>
  );
};
