import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserService from '@services/UserService';
import { useRouter } from 'next/router';
import '@testing-library/jest-dom';
import UserLoginForm from '@components/login/UserLoginForm';

// Mock the dependencies
jest.mock('@services/UserService');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('UserLoginForm', () => {
  const mockPush = jest.fn();
  
  beforeEach(() => {
    // Reset mock before each test
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    jest.clearAllMocks();
  });

  test('renders form elements correctly', () => {
    render(<UserLoginForm />);
    
    // Check if username and password input fields are rendered
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  test('displays validation errors when inputs are empty', async () => {
    render(<UserLoginForm />);
    
    // Submit form with empty fields
    userEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Wait for validation error messages to appear
    await waitFor(() => {
      expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  test('calls login API on submit with valid data', async () => {
    const mockResponse = { status: 200, json: () => ({ token: 'mock-token' }) };
    (UserService.login as jest.Mock).mockResolvedValue(mockResponse);

    render(<UserLoginForm />);
    
    // Fill out the form fields
    userEvent.type(screen.getByLabelText(/Username/i), 'testuser');
    userEvent.type(screen.getByLabelText(/Password/i), 'password123');
    
    // Submit the form
    userEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Check if the success message is shown
    await waitFor(() => {
      expect(screen.getByText(/Login successful/i)).toBeInTheDocument();
    });

    // Check if the push function was called to navigate
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  test('displays error message when login fails with 401 status', async () => {
    const mockResponse = { status: 401, json: () => ({ errorMessage: 'Invalid credentials' }) };
    (UserService.login as jest.Mock).mockResolvedValue(mockResponse);

    render(<UserLoginForm />);
    
    // Fill out the form fields
    userEvent.type(screen.getByLabelText(/Username/i), 'testuser');
    userEvent.type(screen.getByLabelText(/Password/i), 'wrongpassword');
    
    // Submit the form
    userEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });

  test('displays generic error message when login fails with unknown error', async () => {
    const mockResponse = { status: 500, json: () => ({}) };
    (UserService.login as jest.Mock).mockResolvedValue(mockResponse);

    render(<UserLoginForm />);
    
    // Fill out the form fields
    userEvent.type(screen.getByLabelText(/Username/i), 'testuser');
    userEvent.type(screen.getByLabelText(/Password/i), 'password123');
    
    // Submit the form
    userEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Wait for the generic error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Invalid username or password/i)).toBeInTheDocument();
    });
  });
});
