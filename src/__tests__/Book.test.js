import React from 'react';
import ReactDOM from 'react-dom';
import Book from '../components/Book';

describe('', () => {
  test('renders book', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Book />, div);
  });
});
