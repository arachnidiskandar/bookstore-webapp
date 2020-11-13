import React from 'react';
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import App from './App';

describe('App Testing', () => {
  test('renders App', () => {
    const root = document.createElement('div');
    ReactDOM.render(<App />, root);
  });
});
