import React from 'react';
import ReactDOM from 'react-dom';
import BookCreation from '../components/BookCreation';

test('renders BookCreation', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BookCreation />, div);
});
