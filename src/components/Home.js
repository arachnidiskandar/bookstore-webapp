import React from 'react';
import { BooksInfoProvider } from '../contexts/BooksInfoContext';
import BooksList from './BooksList';

const Home = () => {
  return (
    <>
      <BooksInfoProvider>
        <BooksList />
      </BooksInfoProvider>
    </>
  );
};

export default Home;
