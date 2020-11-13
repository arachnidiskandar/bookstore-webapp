import React from 'react';
import ReactDOM from 'react-dom';
import Book from '../components/Book';
import { render, fireEvent, screen, waitForElement } from '../utils/test-utils';

describe('Book', () => {
  test('should renders book', () => {
    render(<Book />);
  });
  test('should call handleReserveClick', async () => {
    const mockBook = {
      id: 2,
      title: 'Book 22',
      author: 'Augusto',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum, alias nulla autem repellat laboriosam repudiandae quasi? Quis tenetur magni sunt quia accusantium molestiae. Eos, dolorem culpa! Aliquid officia molestiae voluptates!',
      available: true,
    };
    const mock = jest.fn();
    const { getByText, debug } = render(
      <Book book={mockBook} handleReserveClick={mock} />,
    );
    const button = await waitForElement(() => getByText('Reservar'));
    fireEvent.click(button);
    expect(mock).toHaveBeenCalled();
  });
});
