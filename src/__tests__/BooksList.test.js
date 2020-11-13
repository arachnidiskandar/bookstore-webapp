import React from 'react';
import ReactDOM from 'react-dom';
import BooksList from '../components/BooksList';

test('renders BooksList', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BooksList />, div);
});
