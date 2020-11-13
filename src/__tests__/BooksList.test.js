import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import BooksList from '../components/BooksList';
import { render, fireEvent } from '../utils/test-utils';

describe('BooksList', () => {
  test('should renders BooksList', () => {
    render(<BooksList />);
  });
  test('should call handleCreateButton', async () => {
    const mockHandleButtonCreateBook = jest.fn();
    const { getByTestId, getByText, debug } = render(
      <BooksList handleButtonCreateBook={mockHandleButtonCreateBook} />,
    );
    await act(async () => {
      const button = getByText('Cadastrar Livro');
      fireEvent.click(button);
    });
    debug();
    expect(mockHandleButtonCreateBook).toHaveBeenCalled();
  });
});
