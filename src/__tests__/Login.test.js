import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, waitForElement } from '../utils/test-utils';
import Login from '../components/Login';

describe('Login', () => {
  test('should renders login', () => {
    const { getByText } = render(<Login />);
    getByText('Bem Vindo');
  });
  test('should validate fields', async () => {
    const mockOnSubmit = jest.fn();
    const { getByTestId, getByText } = render(
      <Login onSubmit={mockOnSubmit} />,
    );
    fireEvent.submit(getByTestId('test-form-id'));
    await act(async () => {
      waitForElement(() => getByText('Usuário Inválido'));
      waitForElement(() => getByText('Senha Inválida'));
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
  test('should submit form', async () => {
    const mockOnSubmit = jest.fn();
    const { getByTestId, getByLabelText } = render(
      <Login onSubmit={mockOnSubmit} />,
    );

    await act(async () => {
      const inputUser = getByLabelText('Usuário:');
      const inputPassword = getByLabelText('Senha:');
      fireEvent.change(inputUser, { target: { value: 'a' } });
      fireEvent.change(inputPassword, { target: { value: 'a' } });
    });
    await act(async () => {
      fireEvent.submit(getByTestId('test-form-id'));
    });
    // expect(mockOnSubmit).toHaveBeenCalled();
  });
});
