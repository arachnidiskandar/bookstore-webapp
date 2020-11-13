import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import BookCreation from '../components/BookCreation';
import { render, fireEvent, waitForElement } from '../utils/test-utils';

describe('BookCreation', () => {
  test('renders BookCreation', () => {
    render(<BookCreation />);
  });
  test('should call handleCloseEvent', async () => {
    const mockHandleCloseEvent = jest.fn();
    const { getByTestId, getByText, debug } = render(
      <BookCreation handleCloseEvent={mockHandleCloseEvent} />,
    );
    await act(async () => {
      const button = getByText('Cadastrar Livro');
      fireEvent.click(button);
    });
    debug();
    expect(mockHandleCloseEvent).toHaveBeenCalled();
  });
});
