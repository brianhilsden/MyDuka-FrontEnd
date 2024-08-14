import { render, screen, fireEvent } from '@testing-library/react';
import LandingPage from '../components/LandingPage';
import { useNavigate } from 'react-router-dom';

// Mocking useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('LandingPage Component', () => {
  it('should navigate to login page with role when button is clicked', () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    render(<LandingPage />);

    const merchantButton = screen.getByText(/Merchant/i);
    fireEvent.click(merchantButton);
    expect(navigate).toHaveBeenCalledWith('/login', { state: { role: 'Merchant' } });

    const adminButton = screen.getByText(/Admin/i);
    fireEvent.click(adminButton);
    expect(navigate).toHaveBeenCalledWith('/login', { state: { role: 'Admin' } });

    const clerkButton = screen.getByText(/Clerk/i);
    fireEvent.click(clerkButton);
    expect(navigate).toHaveBeenCalledWith('/login', { state: { role: 'Clerk' } });
  });
});
