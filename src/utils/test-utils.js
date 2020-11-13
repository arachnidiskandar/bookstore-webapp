import React, { useState } from 'react';
import { render } from '@testing-library/react';
import { ModalAlertProvider } from '../contexts/ModalAlertContext';
import { LoadingProvider } from '../contexts/LoadingContext';
import { AuthProvider } from '../contexts/AuthContext';
import { BooksInfoProvider } from '../contexts/BooksInfoContext';
import 'mutationobserver-shim';

const AllTheProviders = ({ children }) => {
  const [modalAlertState, setModalAlertState] = useState({
    type: '',
    isOpen: false,
    message: '',
  });
  const [loadingState, setLoadingState] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [booksInfo, setBooksInfo] = useState({
    isModalOpen: true,
    books: [
      {
        id: 2,
        title: 'Book 22',
        author: 'Augusto',
        description:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum, alias nulla autem repellat laboriosam repudiandae quasi? Quis tenetur magni sunt quia accusantium molestiae. Eos, dolorem culpa! Aliquid officia molestiae voluptates!',
        available: true,
      },
    ],
  });
  return (
    <BooksInfoProvider value={[booksInfo, setBooksInfo]}>
      <AuthProvider value={[currentUser, setCurrentUser]}>
        <LoadingProvider value={[loadingState, setLoadingState]}>
          <ModalAlertProvider value={[modalAlertState, setModalAlertState]}>
            {children}
          </ModalAlertProvider>
        </LoadingProvider>
      </AuthProvider>
    </BooksInfoProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
