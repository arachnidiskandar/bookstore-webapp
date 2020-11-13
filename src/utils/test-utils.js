import React, { useState } from 'react';
import { render } from '@testing-library/react';
import { ModalAlertProvider } from '../contexts/ModalAlertContext';
import { LoadingProvider } from '../contexts/LoadingContext';
import { AuthProvider } from '../contexts/AuthContext';
import 'mutationobserver-shim';

const AllTheProviders = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <AuthProvider value={[currentUser, setCurrentUser]}>
      <LoadingProvider value={{}}>
        <ModalAlertProvider value={[]}>{children}</ModalAlertProvider>
      </LoadingProvider>
    </AuthProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
