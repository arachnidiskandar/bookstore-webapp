import React, { useState } from 'react';

export const ModalAlertContext = React.createContext();

export const ModalAlertProvider = ({ children }) => {
  const [modalAlertState, setModalAlertState] = useState({
    type: '',
    isOpen: false,
    message: '',
  });
  return (
    <ModalAlertContext.Provider value={[modalAlertState, setModalAlertState]}>
      {children}
    </ModalAlertContext.Provider>
  );
};
