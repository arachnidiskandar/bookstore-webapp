import React, { useState } from 'react';

export const BooksInfoContext = React.createContext();

export const BooksInfoProvider = ({ children }) => {
  const [booksInfo, setBooksInfo] = useState({
    isModalOpen: false,
    books: [],
  });
  return (
    <BooksInfoContext.Provider value={[booksInfo, setBooksInfo]}>
      {children}
    </BooksInfoContext.Provider>
  );
};
