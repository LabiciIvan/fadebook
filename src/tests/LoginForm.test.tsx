import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import LoginForm from '../components/LoginForm';

describe('Loginform Component, Test 1:', () => {
  test('Shouldn\'t call onSubmitForm(), if input fields are empty', () => {

    const mockSubmit = vi.fn();

    render(<LoginForm onSubmitForm={mockSubmit} />);

    fireEvent.submit(screen.getByRole('button'));

    expect(mockSubmit).not.toHaveBeenCalled();
  });
});


describe('LoginForm Component, Test 2:', () => {
  test('Should call onSubmitForm(), if input fields contain values', () => {

    const mockSubmit = vi.fn();

    render(<LoginForm onSubmitForm={mockSubmit}/>);

    const submitButton = screen.getByRole('button');

    const usernameInput: HTMLInputElement = screen.getByPlaceholderText('Username/Email');
    const passwordInput: HTMLInputElement = screen.getByPlaceholderText('Password');

    fireEvent.change(usernameInput, { target: { value: 'John Doe' } });
    fireEvent.change(passwordInput, { target: { value: 'secret' } });

    fireEvent.submit(submitButton);

    // Expect there's 
    expect(usernameInput.value).toBe('John Doe');
    expect(passwordInput.value).toBe('secret');

    expect(mockSubmit).toBeCalled();
  })
});


describe('LoginForm component, Test 3:', () => {
  test('Shouldn\'t call onSubmitForm(), if input fields are only whitespaces', () => {

    const mockSubmit = vi.fn();

    render(<LoginForm onSubmitForm={mockSubmit} />);

    const usernameInput: HTMLInputElement = screen.getByPlaceholderText('Username/Email');

    const submitButton: HTMLElement = screen.getByRole('button');

    fireEvent.change(usernameInput, {target: { value: '    '}});
    fireEvent.submit(submitButton);

    // Expect the length of input is 4 whitespaces
    expect(usernameInput.value).toHaveLength(4);

    // Expect to not call the submit after trimming the input
    expect(mockSubmit).not.toBeCalled();
  })
})
